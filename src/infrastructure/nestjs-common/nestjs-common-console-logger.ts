import { Injectable, ConsoleLogger } from '@nestjs/common';

import { Logger } from '../../application/shared/logger';
import { AlsThreadContext } from '../node-async-hooks/als-thread-context';

@Injectable()
export class NestjsCommonConsoleLogger extends ConsoleLogger implements Logger {
  constructor(private readonly alsThreadContext: AlsThreadContext) {
    super();
  }

  log(message: any) {
    super.log({
      threadId: this.alsThreadContext.get('threadId'),
      message: message,
    });
  }

  error(message: any) {
    super.error({
      threadId: this.alsThreadContext.get('threadId'),
      message: message,
    });
  }

  warn(message: any) {
    super.warn({
      threadId: this.alsThreadContext.get('threadId'),
      message: message,
    });
  }

  debug(message: any) {
    super.debug({
      threadId: this.alsThreadContext.get('threadId'),
      message: message,
    });
  }
}
