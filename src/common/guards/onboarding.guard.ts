import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import type { UserAuth } from 'src/modules/users/types/users.type'

@Injectable()
export class OnboardingGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const user: UserAuth = request.user

    if (!user.isOnboardingCompleted) {
      return false
    }

    return true
  }
}
