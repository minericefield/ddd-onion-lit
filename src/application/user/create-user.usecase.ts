import { Injectable } from '@nestjs/common';

import { UserFactory } from '../../domain/user/user.aggregate-root.factory';
import { UserRepository } from '../../domain/user/user.repository';

import {
  CreateUserUseCaseRequestDto,
  CreateUserUseCaseResponseDto,
} from './create-user.usecase.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userFactory: UserFactory,
  ) {}

  /**
   * @throws {InvalidUserEmailAddressFormatException}
   * @throws {DuplicatedUserEmailAddressException}
   */
  async handle(
    requestDto: CreateUserUseCaseRequestDto,
  ): Promise<CreateUserUseCaseResponseDto> {
    /**
     * Create user.
     */
    const user = await this.userFactory.handle(
      requestDto.name,
      requestDto.emailAddress,
    );

    /**
     * Store it.
     */
    await this.userRepository.insert(user);

    return new CreateUserUseCaseResponseDto(user);
  }
}
