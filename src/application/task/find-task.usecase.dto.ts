import { Task } from '../../domain/task/task.aggregate-root';

export interface FindTaskUseCaseRequestDto {
  readonly id: string;
}

/**
 * It would be unnatural to return user information with just the ID, but it has not yet been clearly determined what information about the task is required in this use case.
 * Therefore, we are returning the entity as is for the time being.
 */
export class FindTaskUseCaseResponseDto {
  readonly task: {
    id: string;
    name: string;
    comments: {
      id: string;
      userId: string;
      content: string;
      postedAt: {
        year: number;
        month: number;
        date: number;
        hours: number;
        minutes: number;
      };
    }[];
    userId?: string;
  };

  constructor(task: Task) {
    this.task = {
      id: task.id.value,
      name: task.name.value,
      comments: task.comments.map((comment) => ({
        id: comment.id.value,
        userId: comment.userId.value,
        content: comment.content,
        postedAt: {
          year: comment.postedAt.getFullYear(),
          month: comment.postedAt.getMonth() + 1,
          date: comment.postedAt.getDate(),
          hours: comment.postedAt.getHours(),
          minutes: comment.postedAt.getMinutes(),
        },
      })),
      userId: task.userId?.value,
    };
  }
}
