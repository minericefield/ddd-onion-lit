import { Logger } from '@nestjs/common';
import { Command, CommandRunner } from 'nest-commander';

import { CreateUserUseCase } from '../../application/user/create-user.usecase';

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

    const { id } = await this.createUserUseCase.handle({
      name,
      emailAddress,
    });
    Logger.log(`User successfully created. id: ${id}`);
  }
}
