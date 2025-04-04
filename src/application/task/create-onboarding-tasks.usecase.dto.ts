import { Task } from '../../domain/task/task.aggregate-root';

export interface CreateOnboardingTasksUseCaseRequestDto {
  readonly userId: string;
}

export class CreateOnboardingTasksUseCaseResponseDto {
  readonly ids: string[];

  constructor(tasks: Task[]) {
    this.ids = tasks.map((task) => task.id.value);
  }
}
