import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common'

@Injectable()
export class OnboardingGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest()
    const { hasCompletedOnboarding } = request.user

    if (!hasCompletedOnboarding) {
      throw new HttpException(
        {
          message: 'Finalize a tela de onboarding para prosseguir',
          code: 'COMPLETE_ONBOARDING',
        },
        HttpStatus.FORBIDDEN,
      )
    }

    return true
  }
}
