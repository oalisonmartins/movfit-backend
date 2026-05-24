import { Injectable } from '@nestjs/common'
import { DietsRepository } from 'src/modules/diets/repositories/diets.repository'
import { GetDietsOutput } from 'src/modules/diets/types'

@Injectable()
export class GetActiveDietUseCase {
  constructor(private readonly dietsRepository: DietsRepository) {}

  async execute(userId: string): Promise<GetDietsOutput | null> {
    const activeDiet = await this.dietsRepository.findActive(userId)

    if (!activeDiet) return null

    return {
      id: activeDiet.id,
      isActive: activeDiet.isActive,
      goal: activeDiet.goal,
      createdAt: activeDiet.createdAt,
      macros: {
        caloriesInKcal: activeDiet.totalCalorieInKcal,
        proteinsInGrams: activeDiet.totalProteinInGrams,
        carbsInGrams: activeDiet.totalCarbInGrams,
        fatsInGrams: activeDiet.totalFatInGrams,
      },
    }
  }
}
