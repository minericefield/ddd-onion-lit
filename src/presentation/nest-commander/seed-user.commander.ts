import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';

import { CreateUserUseCase } from '../../application/user/create-user.usecase';

/**
 * Seeder should be defined in different resources(e.g., belonging to database or orm).
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

  constructor(private readonly createUserUseCase: CreateUserUseCase) {
    super();
  }

  async run() {
    await Promise.all([
      ...SeedUserCommander.USERS.map(({ name, emailAddress }) =>
        this.createUserUseCase.handle({
          name,
          emailAddress,
        }),
      ),
    ]);
    Logger.log('Seeder successfully completed.');
  }
}
