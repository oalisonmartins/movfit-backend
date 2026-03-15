import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';

import { HashRepository } from './hash.repository';

@Injectable()
export class BcryptHashRepository implements HashRepository {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const isPasswordMatch = bcrypt.compare(password, hash);
    return isPasswordMatch;
  }
}
