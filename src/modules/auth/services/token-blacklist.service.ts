import { Injectable } from '@nestjs/common'
import { InjectRedis } from '@nestjs-modules/ioredis'
import Redis from 'ioredis'

@Injectable()
export class TokenBlacklistService {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async blacklist(jti: string, ttl: number): Promise<void> {
    await this.redis.set(`blacklist:${jti}`, '1', 'EX', ttl)
  }

  async isBlacklisted(jti: string): Promise<boolean> {
    return (await this.redis.exists(`blacklist:${jti}`)) === 1
  }
}
