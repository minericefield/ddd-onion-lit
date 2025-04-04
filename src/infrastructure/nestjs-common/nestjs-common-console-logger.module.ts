import { Global, Module } from '@nestjs/common';

import { Logger } from '../../application/shared/logger';

import { NestjsCommonConsoleLogger } from './nestjs-common-console-logger';

@Global()
@Module({
  providers: [
    {
      provide: Logger,
      useClass: NestjsCommonConsoleLogger,
    },
  ],
  exports: [Logger],
})
export class NestjsCommonConsoleLoggerModule {}
