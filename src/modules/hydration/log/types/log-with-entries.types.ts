import { HydrationLogGetPayload } from 'generated/prisma/models'

export type HydrationLogWithEntries = HydrationLogGetPayload<{
  include: {
    hydrationEntries: true
  }
}>
