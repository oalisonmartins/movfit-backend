import { Injectable } from '@nestjs/common'
import { Meal } from 'generated/prisma/client'
import { CreateMealInput } from '../types/create-meal.type'

@Injectable()
export abstract class MealsRepository {
  abstract create(input: CreateMealInput): Promise<Meal>
  abstract findOne(userId: string, scheduledTimeInSeconds: number): Promise<Meal | null>
}
