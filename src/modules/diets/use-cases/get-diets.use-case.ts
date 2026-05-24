import { Injectable } from '@nestjs/common'
import { DietsRepository } from 'src/modules/diets/repositories/diets.repository'
import { GetDietsOutput } from 'src/modules/diets/types'

@Injectable()
export class GetDietsUseCase {
  constructor(private readonly dietsRepository: DietsRepository) {}

  async execute(userId: string, isActive?: boolean): Promise<GetDietsOutput[]> {
    const diets = await this.dietsRepository.findMany(userId, isActive)

    if (diets.length === 0) return []

    return diets.map((diet) => ({
      id: diet.id,
      isActive: diet.isActive,
      goal: diet.goal,
      createdAt: diet.createdAt.toLocaleDateString('pt-BR', {
        timeZone: 'UTC',
      }),
      totalCaloriesInKcal: diet.totalCalorieInKcal,
      totalProteinsInGrams: diet.totalProteinInGrams,
      totalCarbsInGrams: diet.totalCarbInGrams,
      totalFatsInGrams: diet.totalFatInGrams,
    }))
  }
}
