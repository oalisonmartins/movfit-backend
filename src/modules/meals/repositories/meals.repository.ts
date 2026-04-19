import { Injectable } from '@nestjs/common'
import { Meal } from 'generated/prisma/client'
import { TransactionClient } from 'generated/prisma/internal/prismaNamespace'
import { CreateMealInput } from '../types/create-meal.type'

@Injectable()
export abstract class MealsRepository {
  abstract create(input: CreateMealInput, tx?: TransactionClient): Promise<Meal>
}
