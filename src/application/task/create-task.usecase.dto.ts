import { Task } from '../../domain/task/task.aggregate-root';

export interface CreateTaskUseCaseRequestDto {
  readonly taskName: string;
}

export class CreateTaskUseCaseResponseDto {
  readonly id: string;

  constructor(task: Task) {
    this.id = task.id.value;
  }
}
