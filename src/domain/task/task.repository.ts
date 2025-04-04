import { TaskId } from './task-id.value-object';
import { Task } from './task.aggregate-root';

export abstract class TaskRepository {
  abstract insert(task: Task): Promise<void>;
  abstract insertMany(tasks: Task[]): Promise<void>;
  abstract update(task: Task): Promise<void>;
  abstract find(): Promise<Task[]>;
  abstract findOneById(id: TaskId): Promise<Task | undefined>;
}
