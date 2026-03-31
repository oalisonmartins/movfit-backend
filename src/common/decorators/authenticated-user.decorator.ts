import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common'

export const AuthenticatedUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const user = request.user

  if (!user) throw new UnauthorizedException('Unauthorized.')

  return user
})
