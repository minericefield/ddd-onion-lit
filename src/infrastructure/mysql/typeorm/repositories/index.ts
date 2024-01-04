import { TaskRepository } from '../../../../domain/task/task.repository';
import { UserRepository } from '../../../../domain/user/user.repository';

import { TaskTypeormRepository } from './task.typeorm-repository';
import { UserTypeormRepository } from './user.typeorm-repository';

export default [
  {
    provide: TaskRepository,
    useClass: TaskTypeormRepository,
  },
  {
    provide: UserRepository,
    useClass: UserTypeormRepository,
  },
];
