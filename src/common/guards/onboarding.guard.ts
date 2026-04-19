import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class OnboardingGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const user = request.user

    if (!user.isOnboardingCompleted) {
      throw new UnauthorizedException('Unauthorized: finish your onboarding.')
    }

    return true
  }
}
