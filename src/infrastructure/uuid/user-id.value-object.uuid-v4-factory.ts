import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { UserId, UserIdFactory } from '../../domain/user/user-id.value-object';

@Injectable()
export class UserIdUuidV4Factory implements UserIdFactory {
  handle() {
    return new UserId(v4());
  }
}
