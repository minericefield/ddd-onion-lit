import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { RepositoryTransactor } from '../../../../application/shared/repository-transactor.';

@Injectable()
export class TypeormRepositoryTransactor implements RepositoryTransactor {
  constructor(private readonly dataSource: DataSource) {}

  async handle<T>(manipulation: () => Promise<T>): Promise<T> {
    // Simple transactions seem to work even without entity manager.
    return this.dataSource.transaction(manipulation);
  }
}
