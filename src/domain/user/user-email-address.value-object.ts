import { ValidationDomainException } from '../shared/domain-exception';

export class UserEmailAddress {
  private static readonly USER_EMAIL_ADDRESS_PATTERN =
    /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;

  private _value: string;

  constructor(value: string) {
    if (!UserEmailAddress.USER_EMAIL_ADDRESS_PATTERN.test(value)) {
      throw new InvalidUserEmailAddressFormatException();
    }
    this._value = value;
  }

  get value() {
    return this._value;
  }
}

export class InvalidUserEmailAddressFormatException extends ValidationDomainException {
  constructor() {
    super(`Invalid email address format.`);
  }
}
