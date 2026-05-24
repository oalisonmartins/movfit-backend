import { Injectable } from '@nestjs/common'
import { DietsRepository } from 'src/modules/diets/repositories/diets.repository'
import { GetDietsOutput } from 'src/modules/diets/types'

@Injectable()
export class GetDietsUseCase {
  constructor(private readonly dietsRepository: DietsRepository) {}

  async execute(userId: string): Promise<GetDietsOutput[]> {
    const diets = await this.dietsRepository.findAll(userId)

    if (diets.length === 0) return []

    return diets.map((diet) => ({
      id: diet.id,
      isActive: diet.isActive,
      goal: diet.goal,
      createdAt: diet.createdAt,
      macros: {
        caloriesInKcal: diet.totalCalorieInKcal,
        proteinsInGrams: diet.totalProteinInGrams,
        carbsInGrams: diet.totalCarbInGrams,
        fatsInGrams: diet.totalFatInGrams,
      },
    }))
  }
}
