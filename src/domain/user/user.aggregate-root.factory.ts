import { ValidationDomainException } from '../shared/domain-exception';

import { User } from './user.aggregate-root';

export abstract class UserFactory {
  abstract handle(name: string, emailAddress: string): Promise<User>;
}

/**
 * The technique of defining exception classes on the abstract side, as presented here,
 * is a method introduced in "Good Code, Bad Code: Think like a software engineer".
 */
export class DuplicatedUserEmailAddressException extends ValidationDomainException {
  constructor() {
    super(`User email address is duplicated.`);
  }
}
