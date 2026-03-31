import { Injectable, NotFoundException } from '@nestjs/common'
import { FindByUserIdInput } from 'src/common/types/find-by-user-id.type'
import { UsersRepository } from '../repositories/users-repository'
import { UserGetDietsResponse } from '../types/get-diets.type'

@Injectable()
export class GetDietsUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(input: FindByUserIdInput): Promise<UserGetDietsResponse | null> {
    const user = await this.usersRepository.getDiets({
      userId: input.userId,
    })

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
        foods: meal.consumedFoods.map((food) => ({
          id: food.id,
          name: food.name,
          quantity: food.quantity,
          weightPerUnitInGrams: food.weightPerUnitInGrams,
          totalCalories: food.totalCalories,
          coverImageUrl: food.coverImageUrl,
        })),
      })),
    }))
  }
}
