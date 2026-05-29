import { Injectable } from '@nestjs/common'
import bcrypt from 'bcryptjs'
import { HashingService } from 'src/modules/auth/services/hashing.service'

@Injectable()
export class BcryptHashingService implements HashingService {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password, salt)
    return hash
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const isPasswordMatch = await bcrypt.compare(password, hash)
    return isPasswordMatch
  }
}
