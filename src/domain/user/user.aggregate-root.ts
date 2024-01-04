import { UserEmailAddress } from './user-email-address.value-object';
import { UserId } from './user-id.value-object';

// TODO: Add password.
export class User {
  constructor(
    readonly id: UserId,
    readonly name: string,
    readonly emailAddress: UserEmailAddress,
  ) {}
}
