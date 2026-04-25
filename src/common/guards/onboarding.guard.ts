import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class OnboardingGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const { isOnboardingCompleted } = request.user

    if (!isOnboardingCompleted) throw new UnauthorizedException('Guard unauthorization: incompleted onboarding.')

    return true
  }
}
