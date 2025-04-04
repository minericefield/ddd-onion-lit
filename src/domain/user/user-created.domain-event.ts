import { DomainEvent } from '../shared/domain-event';

import { UserId } from './user-id.value-object';

export class UserCreated extends DomainEvent {
  constructor(readonly userId: UserId) {
    super();
  }

  get name() {
    return UserCreated.name;
  }
}
