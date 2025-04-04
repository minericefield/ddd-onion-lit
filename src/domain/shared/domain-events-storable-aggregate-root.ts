import { DomainEvent } from './domain-event';

export abstract class DomainEventStorableAggregateRoot<T extends DomainEvent> {
  private _events: T[] = [];

  get events(): T[] {
    return [...this._events];
  }

  protected addEvent(event: T) {
    this._events = [...this._events, event];
  }
}
