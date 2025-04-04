import { AsyncLocalStorage } from 'node:async_hooks';

import { Global, Module } from '@nestjs/common';

import { AlsThreadContext } from './als-thread-context';

@Global()
@Module({
  providers: [AsyncLocalStorage, AlsThreadContext],
  exports: [AlsThreadContext],
})
export class AlsThreadContextModule {}
