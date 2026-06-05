import { SetMetadata } from '@nestjs/common'
import { constants } from 'src/common/constants'

export const RequireWorkoutPreference = () => {
  return SetMetadata(constants.REQUIRE_WORKOUT_PREFERENCE_KEY, true)
}
