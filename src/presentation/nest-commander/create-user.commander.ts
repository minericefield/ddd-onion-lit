import { Command, CommandRunner } from 'nest-commander';

import { Logger } from '../../application/shared/logger';
import { CreateUserUseCase } from '../../application/user/create-user.usecase';

/**
 * yarn start:commander CreateUser Charlie example@example.com
 */
@Command({
  name: 'CreateUser',
  description: 'Create user by name and email address.',
})
export class CreateUserCommander extends CommandRunner {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly proxy: (run: () => Promise<void>) => Promise<void>,
    private readonly logger: Logger,
  ) {
    super();
  }

  async run(nameAndEmailAddress: string[]) {
    this.logger.log('Creating user');
    await this.proxy(async () => {
      const [name, emailAddress] = nameAndEmailAddress;

      try {
        const { id } = await this.createUserUseCase.handle({
          name,
          emailAddress,
        });
        this.logger.log(`User successfully created. id: ${id}`);
      } catch (error: unknown) {
        this.logger.error(error);
      }
    });
  }
}
