import { WaterConsumptionHistorySumAggregateOutputType } from 'generated/prisma/models'

export type GetTotalConsumptionInput = {
  userId: string
  date: Date
}

export type GetTotalConsumptionOutput = WaterConsumptionHistorySumAggregateOutputType['amountInMl']
