import { SetMetadata } from '@nestjs/common'

export const RequireActiveDiet = () => {
  return SetMetadata('REQUIRE_ACTIVE_DIET', true)
}
