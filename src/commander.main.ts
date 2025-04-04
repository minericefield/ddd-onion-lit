import { CommandFactory } from 'nest-commander';

import { CommanderModule } from './commander.module';

async function bootstrap() {
  const app = await CommandFactory.createWithoutRunning(CommanderModule, [
    'log',
    'error',
    'warn',
  ]);

  CommandFactory.runApplication(app).then((running) => {
    setTimeout(() => running.close(), 3000);
  });
}
bootstrap();
