import { ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UserAuth } from 'src/modules/users/types/users.type'
import { RequestContextService } from '../services/request-context.service'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly requestContext: RequestContextService) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = (await super.canActivate(context)) as boolean

    if (isAuthenticated) {
      const request = context.switchToHttp().getRequest()
      const userFromRequest: UserAuth = request.user
      this.requestContext.setUser = userFromRequest
    }

    return isAuthenticated
  }
}
