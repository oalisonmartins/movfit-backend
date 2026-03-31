export type GetConsumptionHistoryInput = {
  userId: string
}

export type GetConsumptionHistoryOutput = {
  id: string
  date: Date
  amountConsumedInMl: number
}
