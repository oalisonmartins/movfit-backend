import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { RequestContextService } from 'src/common/services/request-context.service'
import { TransactionService } from 'src/common/services/transaction.service'
import { CreateDietInput, CreateDietOutput } from 'src/modules/diets/types'
import { FoodsRepository } from 'src/modules/foods/repositories/foods.repository'

@Injectable()
export class CreateDietUseCase {
  constructor(
    private readonly foodsRepository: FoodsRepository,
    private readonly requestContext: RequestContextService,
    private readonly transaction: TransactionService,
  ) {}

  async execute(input: CreateDietInput): Promise<CreateDietOutput> {
    const userId = this.requestContext.getUserId

    const { goal: dietGoal, meals: dietMeals } = input
    const mealsTimes = dietMeals.map((dietMeal) => dietMeal.scheduleTimeInSeconds)

    if (new Set(mealsTimes).size !== mealsTimes.length) {
      throw new HttpException(
        {
          message: 'Já existe uma refeição nesse horário',
          code: 'MEAL_TIME_CONFLICT',
        },
        HttpStatus.CONFLICT,
      )
    }

    const sortedMeals = dietMeals.sort((a, b) => a.scheduleTimeInSeconds - b.scheduleTimeInSeconds)

    const foodsIds = new Set(sortedMeals.flatMap((meal) => meal.foods.map((food) => food.foodId)))
    const foods = await this.foodsRepository.findManyByIds([...foodsIds.keys()])
    const foodsMap = new Map(foods.map((food) => [food.id, food]))

    const computedMeals = sortedMeals.map((dietMeal) => {
      const mealFoods = dietMeal.foods.map((dietMealFood) => {
        const food = foodsMap.get(dietMealFood.foodId)

        if (!food) throw new NotFoundException(`Food with ID: ${dietMealFood.foodId} not found`)

        return {
          foodId: food.id,
          calorieInKcal: food.caloriePer100gInKcal,
          proteinInGrams: food.proteinPer100gInGrams,
          carbInGrams: food.carbPer100gInGrams,
          fatInGrams: food.fatPer100gInGrams,
          amountInGrams: dietMealFood.amountInGrams,
        }
      })

      const mealTotalMacros = mealFoods.reduce(
        (total, food) => ({
          calorieInKcal: total.calorieInKcal + (food.calorieInKcal * food.amountInGrams) / 100,
          proteinInGrams: total.proteinInGrams + (food.proteinInGrams * food.amountInGrams) / 100,
          carbInGrams: total.carbInGrams + (food.carbInGrams * food.amountInGrams) / 100,
          fatInGrams: total.fatInGrams + (food.fatInGrams * food.amountInGrams) / 100,
        }),
        { calorieInKcal: 0, proteinInGrams: 0, carbInGrams: 0, fatInGrams: 0 },
      )

      return {
        name: dietMeal.name,
        scheduleTimeInSeconds: dietMeal.scheduleTimeInSeconds,
        foods: mealFoods,
        totalMacros: mealTotalMacros,
      }
    })

    const dietTotalMacros = computedMeals.reduce(
      (total, meal) => ({
        calorieInKcal: total.calorieInKcal + meal.totalMacros.calorieInKcal,
        carbInGrams: total.carbInGrams + meal.totalMacros.carbInGrams,
        fatInGrams: total.fatInGrams + meal.totalMacros.fatInGrams,
        proteinInGrams: total.proteinInGrams + meal.totalMacros.proteinInGrams,
      }),
      { calorieInKcal: 0, carbInGrams: 0, fatInGrams: 0, proteinInGrams: 0 },
    )

    return await this.transaction.run(async (tx) => {
      const activeDiet = await tx.diet.findFirst({
        where: { userId, isActive: true },
      })

      if (activeDiet) {
        await tx.diet.update({
          where: { id: activeDiet.id, userId },
          data: { isActive: false },
        })
      }

      const createdDiet = await tx.diet.create({
        data: {
          userId,
          goal: dietGoal,
          totalCalorieInKcal: dietTotalMacros.calorieInKcal,
          totalCarbInGrams: dietTotalMacros.carbInGrams,
          totalFatInGrams: dietTotalMacros.fatInGrams,
          totalProteinInGrams: dietTotalMacros.proteinInGrams,
          isActive: true,
        },
      })

      for (const meal of computedMeals) {
        await tx.meal.create({
          data: {
            userId,
            dietId: createdDiet.id,
            name: meal.name,
            scheduleTimeInSeconds: meal.scheduleTimeInSeconds,
            foods: {
              createMany: {
                data: meal.foods.map((food) => ({
                  amountInGrams: food.amountInGrams,
                  foodId: food.foodId,
                })),
              },
            },
          },
        })
      }

      return {
        id: createdDiet.id,
        goal: createdDiet.goal,
        totalCalorieInKcal: createdDiet.totalCalorieInKcal,
        totalProteinInGrams: createdDiet.totalProteinInGrams,
        totalCarbInGrams: createdDiet.totalCarbInGrams,
        totalFatInGrams: createdDiet.totalFatInGrams,
      }
    })
  }
}
