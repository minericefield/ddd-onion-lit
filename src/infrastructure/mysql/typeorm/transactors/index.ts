import { RepositoryTransactor } from '../../../../application/shared/repository-transactor.';

import { TypeormRepositoryTransactor } from './typeorm-repository-transactor';

export default [
  {
    provide: RepositoryTransactor,
    useClass: TypeormRepositoryTransactor,
  },
];
