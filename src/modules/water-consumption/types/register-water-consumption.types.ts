export type RegisterWaterConsumptionInput = {
  amountConsumedInMl: number
}

export type RegisterWaterConsumptionRepositoryInput = {
  dailyWaterConsumptionId: string
  dateOfConsumption: Date
  amountConsumedInMl: number
}
