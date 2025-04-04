import { DomainEvent } from '../shared/domain-event';

export class UserFooBar extends DomainEvent {
  get name() {
    return UserFooBar.name;
  }
}
