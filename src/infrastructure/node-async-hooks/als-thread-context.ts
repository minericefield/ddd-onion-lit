import { AsyncLocalStorage } from 'node:async_hooks';

import { Injectable } from '@nestjs/common';

@Injectable()
export class AlsThreadContext {
  constructor(private readonly als: AsyncLocalStorage<Map<string, any>>) {}

  /**
   * given run has to be promisified
   */
  run<T>(run: () => Promise<T>): Promise<T> {
    const threadId = Math.random().toString(32).substring(2);

    return this.als.run(new Map([['threadId', threadId]]), run);
  }

  get<T>(key: string): T | undefined {
    return this.als.getStore().get(key);
  }

  set(key: string, value: any) {
    this.als.getStore().set(key, value); // or enterWith
  }
}
