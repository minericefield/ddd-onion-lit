import { Command, CommandRunner } from 'nest-commander';

import { CreateUserUseCase } from '../../application/user/create-user.usecase';

/**
 * Seeder should be defined in different resources(e.g., belonging to database or orm).
 * It actually shouldn't call use case.
 */
@Command({
  name: 'SeedUser',
  description: 'Seeding for development',
})
export class SeedUserCommander extends CommandRunner {
  private static readonly USERS = [
    {
      name: 'Michael',
      emailAddress: 'test@example.com',
    },
    {
      name: 'John',
      emailAddress: 'email@address.com',
    },
  ];

  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly proxy: (run: () => Promise<void>) => Promise<void>,
  ) {
    super();
  }

  async run() {
    await this.proxy(async () => {
      await Promise.all([
        ...SeedUserCommander.USERS.map(({ name, emailAddress }) =>
          this.createUserUseCase.handle({
            name,
            emailAddress,
          }),
        ),
      ]);
    });
  }
}
