export class UserId {
  _userIdBrand!: never;

  constructor(readonly value: string) {}
}

export abstract class UserIdFactory {
  abstract handle(): UserId;
}
