import { Injectable, NotFoundException } from '@nestjs/common'
import { DietsRepository } from '../repositories/diets.repository'
import { DeleteDietInput } from '../types/delete-diet.type'

@Injectable()
export class DeleteDietUseCase {
  constructor(private readonly dietsRepo: DietsRepository) {}

  async execute(input: DeleteDietInput) {
    const diet = await this.dietsRepo.getOne(input.dietId, input.userId)

    if (!diet) throw new NotFoundException('Diet not found.')

    await this.dietsRepo.delete(diet.id)
  }
}
