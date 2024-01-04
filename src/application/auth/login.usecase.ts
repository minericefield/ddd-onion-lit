import { Injectable } from '@nestjs/common';

import {
  InvalidUserEmailAddressFormatException,
  UserEmailAddress,
} from '../../domain/user/user-email-address.value-object';
import { UserRepository } from '../../domain/user/user.repository';
import { AuthenticationFailedApplicationException } from '../shared/application-exception';
import { UserSessionStorage } from '../shared/user-session';

import {
  LoginUseCaseRequestDto,
  LoginUseCaseResponseDto,
} from './login.usecase.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userSessionStorage: UserSessionStorage,
  ) {}

  /**
   * @throws {AuthenticationFailedApplicationException}
   */
  async handle(
    requestDto: LoginUseCaseRequestDto,
  ): Promise<LoginUseCaseResponseDto> {
    /**
     * Create userEmailAddress.
     */
    let userEmailAddress: UserEmailAddress;
    try {
      userEmailAddress = new UserEmailAddress(requestDto.emailAddress);
    } catch (error: unknown) {
      if (error instanceof InvalidUserEmailAddressFormatException) {
        throw new AuthenticationFailedApplicationException('Login failed.', {
          cause: error,
        });
      }

      throw error;
    }

    /**
     * Find user.
     */
    const user =
      await this.userRepository.findOneByEmailAddress(userEmailAddress);
    if (!user) {
      throw new AuthenticationFailedApplicationException('Login failed.');
    }

    /**
     * Create session.
     */
    const sessionId = await this.userSessionStorage.set({
      userId: user.id,
    });

    return new LoginUseCaseResponseDto(sessionId);
  }
}
