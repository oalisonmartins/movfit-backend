import { Module } from '@nestjs/common';
import { HashRepository } from './repositories/hash.repository';
import { BcryptHashRepository } from './repositories/bcrypt-hash.repository';

@Module({
  exports: [HashRepository],
  providers: [
    {
      provide: HashRepository,
      useClass: BcryptHashRepository,
    },
  ],
})
export class HashModule {}
