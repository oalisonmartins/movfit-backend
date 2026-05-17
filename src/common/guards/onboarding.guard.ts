import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'

@Injectable()
export class OnboardingGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const { isOnboardingCompleted } = request.user

    if (!isOnboardingCompleted) {
      throw new ForbiddenException({
        message: 'Finalize a tela de onboarding para prosseguir.',
        code: 'COMPLETE_ONBOARDING',
      })
    }

    return true
  }
}
