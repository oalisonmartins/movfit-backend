import { Injectable } from '@nestjs/common'
import { Diet } from 'generated/prisma/client'
import { CreateDietsRepositoryInput } from '../types/create-diet.types'

@Injectable()
export abstract class DietsRepository {
  abstract findOne(dietId: string, userId: string): Promise<Diet | null>
  abstract findOneByMealAndUserId(mealId: string, userId: string): Promise<Diet | null>
  abstract findMany(userId: string, isActive?: boolean): Promise<Diet[]>
  abstract create(input: CreateDietsRepositoryInput): Promise<Diet>
  abstract deactivate(dietId: string, userId: string): Promise<Diet>
  abstract delete(dietId: string, userId: string): Promise<Diet>
}
