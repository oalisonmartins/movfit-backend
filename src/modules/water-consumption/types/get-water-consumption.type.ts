import { WaterConsumptionGetPayload } from 'generated/prisma/models'

export type GetWaterConsumptionInput = {
  userId: string
  date: Date
}

export type GetWaterConsumptionOutput = WaterConsumptionGetPayload<{
  select: {
    id: true
    date: true
    goalInMl: true
    consumedInMl: true
  }
}>
