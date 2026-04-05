import { Injectable, NotFoundException } from '@nestjs/common'
import { UsersRepository } from '../repositories/users-repository'
import { UserGetDietsResponse } from '../types/get-diets.type'

@Injectable()
export class GetDietsUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(userId: string): Promise<UserGetDietsResponse | null> {
    const user = await this.usersRepository.getDiets(userId)

    if (!user) {
      throw new NotFoundException('User not found.')
    }

    if (!user.diets) {
      return null
    }

    return user.diets.map((diet) => ({
      id: diet.id,
      isActive: diet.isActive,
      carbsInGrams: diet.carbsInGrams,
      fatsInGrams: diet.fatsInGrams,
      proteinsInGrams: diet.proteinsInGrams,
      goal: diet.goal,
      meals: diet.meals.map((meal) => ({
        id: meal.id,
        timeInMinutes: meal.timeInMinutes,
        totalCalories: meal.totalCalories,
        carbsInGrams: meal.carbsInGrams,
        proteinsInGrams: meal.proteinsInGrams,
        fatsInGrams: meal.fatsInGrams,
        foods: meal.foods.map((food) => ({
          id: food.id,
          name: food.name,
          quantity: food.quantity,
          caloriesInKcal: food.caloriesInKcal,
        })),
      })),
    }))
  }
}
