import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from 'src/modules/users/repositories/users-repository';
import jwtConfig from '../config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { FastifyRequest } from 'fastify';
import { TokenPayloadDto } from '../dtos/token-payload.dto';
import { PAYLOAD_KEY } from '../constants/auth.constant';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly usersRepository: UsersRepository,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();
    const token = this.extractTokenFromHeader(request);

    const isUserNotAuthenticated = !token || token === null;
    if (isUserNotAuthenticated) {
      throw new UnauthorizedException({
        message: 'Unauthorized.',
        code: 'UNAUTHORIZED_ERROR',
      });
    }

    const payload = await this.jwtService.verifyAsync<TokenPayloadDto>(
      token,
      this.jwtConfiguration,
    );

    const user = await this.usersRepository.getById(payload.sub);

    if (!user) {
      throw new UnauthorizedException({
        message: 'Unauthorized.',
        code: 'UNAUTHORIZED_ERROR',
      });
    } else {
      request[PAYLOAD_KEY] = payload;
    }

    return true;
  }

  private extractTokenFromHeader(req: FastifyRequest): string | null {
    const token = req.headers.authorization;
    const isTokenNotProvided = !token || typeof token !== 'string';

    if (isTokenNotProvided) return null;

    const tokenWithoutPrefix = token.split(' ')[1];
    return tokenWithoutPrefix;
  }
}
