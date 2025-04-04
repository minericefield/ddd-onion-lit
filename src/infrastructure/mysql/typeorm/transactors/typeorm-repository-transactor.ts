import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { RepositoryTransactor } from '../../../../application/shared/repository-transactor.';
import { AlsThreadContext } from '../../../node-async-hooks/als-thread-context';

export const ENTITY_MANAGER_THREAD_CONTEXT_KEY = 'ENTITY_MANAGER';

@Injectable()
export class TypeormRepositoryTransactor implements RepositoryTransactor {
  constructor(
    private readonly dataSource: DataSource,
    private readonly alsThreadContext: AlsThreadContext,
  ) {}

  async handle<T>(
    manipulation: () => Promise<T>,
  ): ReturnType<typeof manipulation> {
    return this.dataSource.transaction((entityManager) => {
      this.alsThreadContext.set(
        ENTITY_MANAGER_THREAD_CONTEXT_KEY,
        entityManager,
      );

      return manipulation();
    });
  }
}
