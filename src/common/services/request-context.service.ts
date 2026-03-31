import { Injectable, Scope } from '@nestjs/common'
import { UserAuth } from 'src/modules/users/types/users.type'

@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  private _user: UserAuth

  set setUser(user: UserAuth) {
    this._user = user
  }

  get getUser(): UserAuth {
    return this._user
  }

  get getUserId(): string {
    return this._user.id
  }
}
