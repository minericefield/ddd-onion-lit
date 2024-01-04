import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { TaskId, TaskIdFactory } from '../../domain/task/task-id.value-object';

@Injectable()
export class TaskIdUuidV4Factory implements TaskIdFactory {
  handle() {
    return new TaskId(v4());
  }
}
