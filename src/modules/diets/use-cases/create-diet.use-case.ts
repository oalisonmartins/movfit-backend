import { randomUUID } from 'node:crypto'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { Food } from 'generated/prisma/client'
import { PortionUnit } from 'generated/prisma/enums'
import { RequestContextService } from 'src/common/services/request-context.service'
import { FoodsRepository } from 'src/modules/foods/repositories/foods.repository'
import { MealsRepository } from 'src/modules/meals/repositories/meals.repository'
import { DietsRepository } from '../repositories/diets.repository'
import { CreateDietUseCaseInput } from '../types/create-diet.types'

@Injectable()
export class CreateDietUseCase {
  constructor(
    private readonly dietsRepo: DietsRepository,
    private readonly mealsRepo: MealsRepository,
    private readonly foodsRepo: FoodsRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async execute(request: CreateDietUseCaseInput) {
    // Destructuring name, goal and meals received from request
    const { name: dietName, goal: dietGoal, meals: dietMeals } = request

    // Get userId from request context and generating future dietId
    const userId = this.requestContext.getUserId
    const dietId = randomUUID()

    const mealsTimes = dietMeals.map((dietMeal) => dietMeal.timeInMinutes)

    // Ensure that doesn't has duplicate meals times
    if (new Set(mealsTimes).size !== mealsTimes.length) {
      throw new BadRequestException('Duplicate meal time')
    }

    // Sorting diet meals
    // TODO: In the future, to remove this, add an "order" property to Meal inside schema, to control order of each diet meal
    const meals = dietMeals.sort((a, b) => a.timeInMinutes - b.timeInMinutes)

    const foodsIds = new Set(meals.flatMap((meal) => meal.foods.map((food) => food.foodId)))
    const foods = await this.foodsRepo.getManyByIds([...foodsIds.keys()])
    const foodsMap = new Map(foods.map((food) => [food.id, food]))

    const computedMeals = meals.map((dietMeal) => {
      const mealFoods = dietMeal.foods.map((dietMealFood) => {
        const food = foodsMap.get(dietMealFood.foodId)

        if (!food) {
          throw new NotFoundException(`Food ${dietMealFood.foodId} not found`)
        }

        const foodMacros = this.calculateMealMacros(food, dietMealFood.amount, dietMealFood.unit)

        return {
          foodId: food.id,
          name: food.name,
          isCustom: food.isCustom,
          caloriesInKcal: foodMacros.caloriesInKcal,
          proteinsInGrams: foodMacros.proteinsInGrams,
          carbsInGrams: foodMacros.carbsInGrams,
          fatsInGrams: foodMacros.fatsInGrams,
          amount: dietMealFood.amount,
          unit: dietMealFood.unit,
        }
      })

      const mealTotalMacros = mealFoods.reduce(
        (total, food) => ({
          caloriesInKcal: total.caloriesInKcal + food.caloriesInKcal,
          proteinsInGrams: total.proteinsInGrams + food.proteinsInGrams,
          carbsInGrams: total.carbsInGrams + food.carbsInGrams,
          fatsInGrams: total.fatsInGrams + food.fatsInGrams,
        }),
        { caloriesInKcal: 0, proteinsInGrams: 0, carbsInGrams: 0, fatsInGrams: 0 },
      )

      return {
        name: dietMeal.name,
        timeInMinutes: dietMeal.timeInMinutes,
        foods: mealFoods,
        mealTotalMacros,
      }
    })

    const dietTotalMacros = computedMeals.reduce(
      (total, meal) => ({
        caloriesInKcal: total.caloriesInKcal + meal.mealTotalMacros.caloriesInKcal,
        carbsInGrams: total.carbsInGrams + meal.mealTotalMacros.carbsInGrams,
        fatsInGrams: total.fatsInGrams + meal.mealTotalMacros.fatsInGrams,
        proteinsInGrams: total.proteinsInGrams + meal.mealTotalMacros.proteinsInGrams,
      }),
      { caloriesInKcal: 0, carbsInGrams: 0, fatsInGrams: 0, proteinsInGrams: 0 },
    )

    const activeDiet = await this.dietsRepo.getActive(userId)

    if (activeDiet) {
      await this.dietsRepo.deactive(activeDiet.id, userId)
    }

    const newDiet = await this.dietsRepo.create(userId, {
      dietId,
      goal: dietGoal,
      name: dietName,
      totalCaloriesInKcal: dietTotalMacros.caloriesInKcal,
      totalCarbsInGrams: dietTotalMacros.carbsInGrams,
      totalFatsInGrams: dietTotalMacros.fatsInGrams,
      totalProteinsInGrams: dietTotalMacros.proteinsInGrams,
    })

    await Promise.all(
      computedMeals.map((meal) =>
        this.mealsRepo.create({
          dietId,
          name: meal.name,
          timeInMinutes: meal.timeInMinutes,
          totalCaloriesInKcal: meal.mealTotalMacros.caloriesInKcal,
          totalProteinsInGrams: meal.mealTotalMacros.proteinsInGrams,
          totalCarbsInGrams: meal.mealTotalMacros.carbsInGrams,
          totalFatsInGrams: meal.mealTotalMacros.fatsInGrams,
          foods: meal.foods,
        }),
      ),
    )

    return newDiet
  }

  private convertToGrams(amount: number, unit: PortionUnit) {
    if (unit === 'G') {
      return amount
    }
    if (unit === 'KG') {
      return amount * 1_000
    }
    throw new BadRequestException('Invalid unit for solid food.')
  }

  private calculateMealMacros(food: Food, amount: number, unit: PortionUnit) {
    const { normalizedBase } = food

    if (normalizedBase === 'PER_100G') {
      const amountInGrams = this.convertToGrams(amount, unit)
      const factor = amountInGrams / 100

      return {
        caloriesInKcal: food.normalizedCaloriesInKcal * factor,
        proteinsInGrams: food.normalizedProteinsInGrams * factor,
        carbsInGrams: food.normalizedCarbsInGrams * factor,
        fatsInGrams: food.normalizedFatsInGrams * factor,
      }
    }

    if (normalizedBase === 'PER_100ML') {
      if (unit !== 'ML' && unit !== 'L') {
        throw new BadRequestException(`Invalid unit (${unit}) for liquid food`)
      }

      const amountInMl = unit === 'L' ? amount * 1_000 : amount
      const factor = amountInMl / 100

      return {
        caloriesInKcal: food.normalizedCaloriesInKcal * factor,
        proteinsInGrams: food.normalizedProteinsInGrams * factor,
        carbsInGrams: food.normalizedCarbsInGrams * factor,
        fatsInGrams: food.normalizedFatsInGrams * factor,
      }
    }

    if (normalizedBase === 'PER_UNIT') {
      if (unit !== 'UNIT') {
        throw new BadRequestException(`Invalid unit (${unit}) for unit-based food`)
      }

      return {
        caloriesInKcal: food.normalizedCaloriesInKcal * amount,
        proteinsInGrams: food.normalizedProteinsInGrams * amount,
        carbsInGrams: food.normalizedCarbsInGrams * amount,
        fatsInGrams: food.normalizedFatsInGrams * amount,
      }
    }

    throw new Error('Invalid normalized base')
  }
}
