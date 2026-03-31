import { WaterConsumptionGetPayload } from 'generated/prisma/models'

export type UpsertWaterConsumptionInput = {
  userId: string
  consumptionDate: Date
  dailyConsumptionInMl?: number
  todayTotalConsumptionInMl: number
}

export type UpsertWaterConsumptionOutput = WaterConsumptionGetPayload<{
  select: {
    id: true
    date: true
    goalInMl: true
    consumedInMl: true
  }
}>
