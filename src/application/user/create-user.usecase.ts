import { Injectable } from '@nestjs/common';

import { DomainEventPublisher } from '../../domain/shared/domain-event-publisher';
import { UserEmailAddressIsNotDuplicated } from '../../domain/user/user-email-address-is-not-duplicated.domain-service';
import { UserEmailAddress } from '../../domain/user/user-email-address.value-object';
import { UserIdFactory } from '../../domain/user/user-id.value-object';
import { User } from '../../domain/user/user.aggregate-root';
import { UserRepository } from '../../domain/user/user.repository';
import { RepositoryTransactor } from '../shared/repository-transactor.';

import {
  CreateUserUseCaseRequestDto,
  CreateUserUseCaseResponseDto,
} from './create-user.usecase.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userIdFactory: UserIdFactory,
    private readonly userEmailAddressIsNotDuplicated: UserEmailAddressIsNotDuplicated,
    private readonly repositoryTransactor: RepositoryTransactor,
    private readonly domainEventPublisher: DomainEventPublisher,
  ) {}

  /**
   * @throws {InvalidUserEmailAddressFormatException}
   * @throws {DuplicatedUserEmailAddressException}
   */
  async handle(
    requestDto: CreateUserUseCaseRequestDto,
  ): Promise<CreateUserUseCaseResponseDto> {
    return this.repositoryTransactor.handle(async () => {
      /**
       * Create userEmailAddress.
       */
      const userEmailAddress = new UserEmailAddress(requestDto.emailAddress);
      await this.userEmailAddressIsNotDuplicated.handle(userEmailAddress);

      /**
       * Create user.
       */
      const user = User.create(
        await this.userIdFactory.handle(),
        requestDto.name,
        userEmailAddress,
      );

      /**
       * Store it.
       */
      await this.userRepository.insert(user);

      /**
       * Publish domain events.
       */
      this.domainEventPublisher.handle(...user.events);

      return new CreateUserUseCaseResponseDto(user);
    });
  }
}
