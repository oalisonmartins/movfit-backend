import { SetMetadata } from '@nestjs/common'
import { constants } from 'src/common/constants'

export const RequireActiveDiet = () => {
  return SetMetadata(constants.REQUIRE_ACTIVE_DIET_KEY, true)
}
