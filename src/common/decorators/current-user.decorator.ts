import { createParamDecorator, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common'

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  const user = request.user

  if (!user) {
    throw new HttpException(
      {
        message: 'Usuário não autenticado',
        code: 'UNAUTHORIZED',
      },
      HttpStatus.UNAUTHORIZED,
    )
  }

  return user
})
