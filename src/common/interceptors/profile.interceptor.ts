import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { constants } from 'src/common/constants'
import { RequestContextService } from 'src/common/services/request-context.service'
import { ProfilesRepository } from 'src/modules/profiles/repositories/profiles.repository'

@Injectable()
export class ProfileInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly ProfilesRepository: ProfilesRepository,
    private readonly requestContext: RequestContextService,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler) {
    const requireProfile = this.reflector.get(constants.REQUIRE_PROFILE_KEY, context.getHandler())

    if (requireProfile) {
      const request = context.switchToHttp().getRequest()
      const user = request.user

      const profile = await this.ProfilesRepository.findOne(user.id)

      if (!profile) {
        throw new HttpException(
          {
            message: 'Preencha corretamente seu perfil para continuar',
            code: 'PROFILE_REQUIRED',
          },
          HttpStatus.FORBIDDEN,
        )
      }

      this.requestContext.setProfile = profile
    }

    return next.handle()
  }
}
