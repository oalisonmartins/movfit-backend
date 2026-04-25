import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { RequestContextService } from '../services/request-context.service'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly requestContext: RequestContextService) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = (await super.canActivate(context)) as boolean

    if (!isAuthenticated) throw new UnauthorizedException('Guard unauthorization: unauthenticated user.')

    const request = context.switchToHttp().getRequest()
    const user = request.user

    this.requestContext.setUser = user
    return true
  }
}
