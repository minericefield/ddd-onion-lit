import { User } from '../../domain/user/user.aggregate-root';

export interface CreateUserUseCaseRequestDto {
  readonly name: string;
  readonly emailAddress: string;
}

export class CreateUserUseCaseResponseDto {
  readonly id: string;

  constructor(user: User) {
    this.id = user.id.value;
  }
}
