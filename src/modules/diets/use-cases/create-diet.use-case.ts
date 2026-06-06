import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
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
    const { generationType } = this.requestContext.getDietPreference

    if (generationType !== 'MANUAL') {
      throw new HttpException(
        {
          message:
            'Você está no modo de geração automática de dieta. Altere para o modo manual ou utilize nossa geração automática de dieta',
          code: 'INVALID_GENERATION_TYPE',
        },
        HttpStatus.BAD_REQUEST,
      )
    }

    const { goal: dietGoal, meals: dietMeals } = input

    const mealsScheduleTime = dietMeals.map((dietMeal) => dietMeal.scheduledTimeInSeconds)
    const mealsScheduleTimeSet = new Set(mealsScheduleTime)

    if (mealsScheduleTimeSet.size !== mealsScheduleTime.length) {
      throw new HttpException(
        {
          message: 'Já existe uma refeição nesse horário',
          code: 'MEAL_TIME_CONFLICT',
        },
        HttpStatus.CONFLICT,
      )
    }

    const mealsSortedByScheduleTime = dietMeals.sort(
      (a, b) => a.scheduledTimeInSeconds - b.scheduledTimeInSeconds,
    )

    const foodsIds = new Set(
      mealsSortedByScheduleTime.flatMap((meal) => meal.foods.map((food) => food.foodId)),
    )
    const foods = await this.foodsRepository.findManyByIds([...foodsIds])
    const foodsMap = new Map(foods.map((food) => [food.id, food]))

    const computedMeals = mealsSortedByScheduleTime.map((dietMeal) => {
      const mealFoods = dietMeal.foods.map((dietMealFood) => {
        const food = foodsMap.get(dietMealFood.foodId)

        if (!food) {
          throw new HttpException(
            {
              message: `O alimento com ID: ${dietMealFood.foodId} não foi encontrado`,
              code: `FOOD_NOT_FOUND`,
            },
            HttpStatus.NOT_FOUND,
          )
        }

        return {
          foodId: food.id,
          caloriePer100gInKcal: food.caloriePer100gInKcal,
          proteinPer100gInGrams: food.proteinPer100gInGrams,
          carbPer100gInGrams: food.carbPer100gInGrams,
          fatPer100gInGrams: food.fatPer100gInGrams,
          amountInGrams: dietMealFood.amountInGrams,
        }
      })

      const mealTotalMacros = mealFoods.reduce(
        (total, food) => ({
          calorieInKcal:
            total.calorieInKcal + (food.caloriePer100gInKcal * food.amountInGrams) / 100,
          proteinInGrams:
            total.proteinInGrams + (food.proteinPer100gInGrams * food.amountInGrams) / 100,
          carbInGrams: total.carbInGrams + (food.carbPer100gInGrams * food.amountInGrams) / 100,
          fatInGrams: total.fatInGrams + (food.fatPer100gInGrams * food.amountInGrams) / 100,
        }),
        { calorieInKcal: 0, proteinInGrams: 0, carbInGrams: 0, fatInGrams: 0 },
      )

      return {
        name: dietMeal.name,
        scheduledTimeInSeconds: dietMeal.scheduledTimeInSeconds,
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

      await Promise.all(
        computedMeals.map((meal) =>
          tx.meal.create({
            data: {
              userId,
              dietId: createdDiet.id,
              name: meal.name,
              scheduledTimeInSeconds: meal.scheduledTimeInSeconds,
              foods: {
                createMany: {
                  data: meal.foods.map((food) => ({
                    amountInGrams: food.amountInGrams,
                    foodId: food.foodId,
                  })),
                },
              },
            },
          }),
        ),
      )

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
