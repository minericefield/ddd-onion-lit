import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';

import { AlsThreadContext } from '../../../../node-async-hooks/als-thread-context';
import _models from '../../models';
import { ENTITY_MANAGER_THREAD_CONTEXT_KEY } from '../../transactors/typeorm-repository-transactor';

type Models = typeof _models;

@Injectable()
export default class GetTypeormRepositories {
  constructor(
    private readonly threadContext: AlsThreadContext,
    private readonly dataSource: DataSource,
  ) {}

  handle<T extends readonly Models[keyof Models][]>(
    ...models: T
  ): { [K in keyof T]: Repository<InstanceType<T[K]>> } {
    const entityManager = this.threadContext.get<EntityManager>(
      ENTITY_MANAGER_THREAD_CONTEXT_KEY,
    );

    /**
     * map cannot recognize tuple types
     */
    return models.map((model) =>
      (entityManager ?? this.dataSource).getRepository(model),
    ) as { [K in keyof T]: Repository<InstanceType<T[K]>> };
  }
}
