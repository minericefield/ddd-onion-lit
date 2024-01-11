import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';

import { CreateUserUseCase } from '../../application/user/create-user.usecase';

/**
 * yarn start:commander CreateUser Charlie example@example.com
 */
@Command({
  name: 'CreateUser',
  description: 'Create user by name and email address.',
})
export class CreateUserCommander extends CommandRunner {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {
    super();
  }

  async run(nameAndEmailAddress: string[]) {
    const [name, emailAddress] = nameAndEmailAddress;

    try {
      const { id } = await this.createUserUseCase.handle({
        name,
        emailAddress,
      });
      Logger.log(`User successfully created. id: ${id}`);
    } catch (error: unknown) {
      Logger.error(error);
    }
  }
}
