import { Injectable } from '@nestjs/common'
import { DietsRepository } from '../repositories/diets.repository'

@Injectable()
export class GetActiveDietUseCase {
  constructor(private readonly dietsRepo: DietsRepository) {}

  async execute(userId: string) {
    const activeDiet = await this.dietsRepo.getActive(userId)

    if (!activeDiet) {
      return null
    }

    return {
      id: activeDiet.id,
      isActive: activeDiet.isActive,
      goal: activeDiet.goal,
      createdAt: activeDiet.createdAt,
      macros: {
        caloriesInKcal: activeDiet.caloriesInKcal,
        proteinsInGrams: activeDiet.proteinsInGrams,
        carbsInGrams: activeDiet.carbsInGrams,
      },
    }
  }
}
