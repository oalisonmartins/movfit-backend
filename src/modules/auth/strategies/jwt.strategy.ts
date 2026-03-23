import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersRepository } from 'src/modules/users/repositories/users-repository';
import { PayloadDto } from '../dtos/payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: String(process.env.JWT_SECRET),
      issuer: String(process.env.JWT_TOKEN_ISSUER),
      audience: String(process.env.JWT_TOKEN_AUDIENCE),
      ignoreExpiration: false,
    });
  }

  async validate(payload: PayloadDto) {
    const user = await this.usersRepository.getById(payload.sub);

    if (!user) {
      return null;
    }

    return user;
  }
}
