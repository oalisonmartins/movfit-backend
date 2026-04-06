import { Injectable } from '@nestjs/common'
import { Diet } from 'generated/prisma/client'
import { PrismaService } from 'src/infra/database/prisma/prisma.service'
import { DietsRepository } from './diets.repository'

@Injectable()
export class PrismaDietsRepository implements DietsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(userId: string): Promise<Diet[]> {
    const diets = await this.prisma.diet.findMany({
      where: { userId },
      orderBy: [{ createdAt: 'desc' }],
    })
    return diets
  }
  async getActive(userId: string): Promise<Diet | null> {
    const activeDiet = await this.prisma.diet.findFirst({
      where: { userId, isActive: { equals: true } },
    })
    if (!activeDiet) {
      return null
    }
    return activeDiet
  }
}
