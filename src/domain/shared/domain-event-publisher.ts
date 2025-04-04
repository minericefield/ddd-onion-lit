import { DomainEvent } from './domain-event';

export abstract class DomainEventPublisher {
  abstract handle(...domainEvents: DomainEvent[]): void;
}
