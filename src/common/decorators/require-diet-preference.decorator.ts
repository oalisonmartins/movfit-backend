import { SetMetadata } from '@nestjs/common'
import { constants } from 'src/common/constants'

export const RequireDietPreference = () => {
  return SetMetadata(constants.REQUIRE_DIET_PREFERENCE_KEY, true)
}
