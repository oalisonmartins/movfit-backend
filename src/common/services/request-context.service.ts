import { Injectable, Scope } from '@nestjs/common'
import { UserDto } from 'src/modules/users/dtos/user.dto'

@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  private _user: UserDto

  set setUser(user: UserDto) {
    this._user = user
  }

  get getUser(): UserDto {
    return this._user
  }

  get getUserId(): string {
    return this._user.id
  }
}
