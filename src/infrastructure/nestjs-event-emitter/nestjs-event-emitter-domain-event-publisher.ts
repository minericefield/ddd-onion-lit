import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

import { DomainEvent } from '../../domain/shared/domain-event';
import { DomainEventPublisher } from '../../domain/shared/domain-event-publisher';

@Injectable()
export class NestjsEventEmitterDomainEventPublisher
  implements DomainEventPublisher
{
  constructor(private readonly eventEmitter: EventEmitter2) {}

  handle(...domainEvents: DomainEvent[]) {
    domainEvents.forEach((domainEvent) => {
      this.eventEmitter.emitAsync(domainEvent.name, domainEvent);
    });
  }
}
