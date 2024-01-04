import { Injectable } from '@nestjs/common';

import { ValidationDomainException } from '../shared/domain-exception';

import { UserEmailAddress } from './user-email-address.value-object';
import { UserRepository } from './user.repository';

/**
 * Maybe better to name this domain service as "AssertUserEmailAddressIsNotDuplicated".
 */
@Injectable()
export class UserEmailAddressIsNotDuplicated {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(userEmailAddress: UserEmailAddress) {
    if (await this.userRepository.findOneByEmailAddress(userEmailAddress)) {
      throw new DuplicatedUserEmailAddressException();
    }
  }
}

export class DuplicatedUserEmailAddressException extends ValidationDomainException {
  constructor() {
    super(`User email address is duplicated.`);
  }
}
