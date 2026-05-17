import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { constants } from 'src/common/constants'
import { InterceptorException } from 'src/common/exceptions/interceptor.exception'
import { RequestContextService } from 'src/common/services/request-context.service'
import { ProfileRepository } from 'src/modules/profile/repositories/profile.repository'

@Injectable()
export class ProfileInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly profileRepository: ProfileRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const requireProfile = this.reflector.get(constants.REQUIRE_PROFILE_KEY, context.getHandler())

    if (requireProfile) {
      const request = context.switchToHttp().getRequest()
      const user = request.user

      const profile = await this.profileRepository.findOne(user.id)

      if (!profile) {
        throw new InterceptorException(
          {
            message: 'Você precisa concluir seu perfil para continuar.',
            code: 'PROFILE_REQUIRED',
          },
          HttpStatus.FORBIDDEN,
        )
      }

      this.requestContext.setProfile = profile
      return next.handle()
    }

    return next.handle()
  }
}
