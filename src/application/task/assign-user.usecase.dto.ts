import { Task } from '../../domain/task/task.aggregate-root';

export interface AssignUserUseCaseRequestDto {
  readonly taskId: string;
  readonly userId: string;
}

export class AssignUserUseCaseResponseDto {
  readonly id: string;

  constructor(task: Task) {
    this.id = task.id.value;
  }
}
