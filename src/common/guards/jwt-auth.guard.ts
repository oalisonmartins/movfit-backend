import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { AuthUser } from 'src/common/types/auth-user.types'
import { RequestContextService } from '../services/request-context.service'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly requestContext: RequestContextService) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context)

    const request = context.switchToHttp().getRequest()
    const user = request.user

    this.requestContext.setUser = user

    return true
  }

  handleRequest<T extends AuthUser>(
    err: Error | null,
    user: T | false,
    info: JsonWebTokenError | TokenExpiredError | Error | null,
  ): T {
    if (err || !user) {
      if (info instanceof TokenExpiredError) {
        throw new UnauthorizedException({
          message: 'Token expirado.',
          code: 'TOKEN_EXPIRED',
        })
      }

      if (info instanceof JsonWebTokenError) {
        throw new UnauthorizedException({
          message: 'Token inválido.',
          code: 'INVALID_TOKEN',
        })
      }

      throw new UnauthorizedException({
        message: 'Você precisa estar autenticado para prosseguir.',
        code: 'REQUIRE_AUTHENTICATION',
      })
    }

    return user
  }
}
