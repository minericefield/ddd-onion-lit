import { FindTasksQueryService } from '../../../../application/task/find-tasks.query-service';

import { FindTasksTypeormQueryService } from './find-tasks.typeorm-query-service';

export default [
  {
    provide: FindTasksQueryService,
    useClass: FindTasksTypeormQueryService,
  },
];
