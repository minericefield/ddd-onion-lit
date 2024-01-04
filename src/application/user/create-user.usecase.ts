import { Injectable } from '@nestjs/common';

import { UserEmailAddressIsNotDuplicated } from '../../domain/user/user-email-address-is-not-duplicated.domain-service';
import { UserEmailAddress } from '../../domain/user/user-email-address.value-object';
import { UserIdFactory } from '../../domain/user/user-id.value-object';
import { User } from '../../domain/user/user.aggregate-root';
import { UserRepository } from '../../domain/user/user.repository';

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
  ) {}

  /**
   * @throws {InvalidUserEmailAddressFormatException}
   * @throws {DuplicatedUserEmailAddressException}
   */
  async handle(
    requestDto: CreateUserUseCaseRequestDto,
  ): Promise<CreateUserUseCaseResponseDto> {
    /**
     * Create userEmailAddress.
     */
    const userEmailAddress = new UserEmailAddress(requestDto.emailAddress);
    await this.userEmailAddressIsNotDuplicated.handle(userEmailAddress);

    /**
     * Create user.
     */
    const user = new User(
      await this.userIdFactory.handle(),
      requestDto.name,
      userEmailAddress,
    );

    /**
     * Store it.
     */
    await this.userRepository.insert(user);

    return new CreateUserUseCaseResponseDto(user);
  }
}
