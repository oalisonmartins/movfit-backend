import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from 'src/modules/users/dtos/user.dto';

export const AuthenticatedUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): UserDto => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (!user.id) {
      throw new UnauthorizedException('Unauthorized.');
    }

    return user;
  },
);
