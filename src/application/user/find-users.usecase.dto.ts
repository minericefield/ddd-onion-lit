import { User } from '../../domain/user/user.aggregate-root';
export class FindUsersUseCaseResponseDto {
  readonly users: {
    id: string;
    name: string;
    emailAddress: string;
  }[];

  constructor(users: User[]) {
    this.users = users.map(({ id, name, emailAddress }) => ({
      id: id.value,
      name: name,
      emailAddress: emailAddress.value,
    }));
  }
}
