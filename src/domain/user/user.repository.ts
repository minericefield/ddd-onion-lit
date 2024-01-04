import { UserEmailAddress } from './user-email-address.value-object';
import { UserId } from './user-id.value-object';
import { User } from './user.aggregate-root';

export abstract class UserRepository {
  abstract insert(user: User): Promise<void>;
  abstract find(): Promise<User[]>;
  abstract findOneById(id: UserId): Promise<User | undefined>;
  abstract findOneByEmailAddress(
    userEmailAddress: UserEmailAddress,
  ): Promise<User | undefined>;
}
