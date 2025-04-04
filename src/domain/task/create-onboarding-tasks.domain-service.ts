import { Injectable } from '@nestjs/common';

import { UserId } from '../user/user-id.value-object';

import { TaskIdFactory } from './task-id.value-object';
import { TaskName } from './task-name.value-object';
import { Task } from './task.aggregate-root';

@Injectable()
export class CreateOnboardingTasks {
  private static readonly ONBOARDING_TASK_NAMES: ReadonlyArray<string> = [
    'Create your GitHub account',
    'Review the project documentation',
  ];

  constructor(private readonly taskIdFactory: TaskIdFactory) {}

  handle(userId: UserId) {
    return Promise.all(
      CreateOnboardingTasks.ONBOARDING_TASK_NAMES.map(
        async (onboardingTaskName) => {
          const task = Task.create(
            await this.taskIdFactory.handle(),
            new TaskName(onboardingTaskName),
          );
          task.assignUser(userId);
          return task;
        },
      ),
    );
  }
}
