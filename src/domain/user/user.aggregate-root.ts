import { DomainEventStorableAggregateRoot } from '../shared/domain-events-storable-aggregate-root';

import { UserFooBar } from './user-bar.domain-event';
import { UserCreated } from './user-created.domain-event';
import { UserEmailAddress } from './user-email-address.value-object';
import { UserId } from './user-id.value-object';

// TODO: Add password.
export class User extends DomainEventStorableAggregateRoot<
  UserFooBar | UserCreated
> {
  private constructor(
    readonly id: UserId,
    readonly name: string,
    readonly emailAddress: UserEmailAddress,
  ) {
    super();
  }

  static create(id: UserId, name: string, emailAddress: UserEmailAddress) {
    const user = new User(id, name, emailAddress);
    user.addEvent(new UserCreated(id));
    return user;
  }

  static reconstitute(
    id: UserId,
    name: string,
    emailAddress: UserEmailAddress,
  ) {
    return new User(id, name, emailAddress);
  }
}
