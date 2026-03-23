import { Injectable, Scope } from '@nestjs/common';
import type { User } from 'generated/prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class RequestContextService {
  private _user: User;

  set setUser(user: User) {
    this._user = user;
  }

  get getUser(): User {
    return this._user;
  }

  get getUserId(): string {
    return this._user.id;
  }
}
