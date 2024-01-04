import { CommandFactory } from 'nest-commander';

import { CommanderModule } from './commander.module';

async function bootstrap() {
  await CommandFactory.run(CommanderModule, ['log', 'error', 'warn']);
}
bootstrap();
