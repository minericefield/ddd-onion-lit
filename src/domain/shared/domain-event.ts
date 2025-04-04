export abstract class DomainEvent {
  _domainEventBrand!: never;

  abstract get name(): string;

  /**
   * https://github.com/VaughnVernon/IDDD_Samples_NET/blob/master/iddd_common/Domain.Model/IDomainEvent.cs
   * version: string
   * occurredOn: Date
   */
}
