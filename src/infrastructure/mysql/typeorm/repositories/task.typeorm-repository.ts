import { Injectable } from '@nestjs/common';

import { CommentId } from '../../../../domain/task/comment/comment-id.value-object';
import { Comment } from '../../../../domain/task/comment/comment.entity';
import { TaskId } from '../../../../domain/task/task-id.value-object';
import { TaskName } from '../../../../domain/task/task-name.value-object';
import { Task } from '../../../../domain/task/task.aggregate-root';
import { TaskRepository } from '../../../../domain/task/task.repository';
import { UserId } from '../../../../domain/user/user-id.value-object';
import models from '../models';

import GetTypeormRepositories from './shared/get-typeorm-repositories';

@Injectable()
export class TaskTypeormRepository implements TaskRepository {
  constructor(private readonly getRepositories: GetTypeormRepositories) {}

  async insert(task: Task) {
    const [taskRepository] = this.getRepositories.handle(models.Task);

    await taskRepository.save({
      id: task.id.value,
      name: task.name.value,
      taskAssignment: task.userId && {
        taskId: task.id.value,
        userId: task.userId.value,
      },
      taskComments: task.comments.map((comment) => ({
        id: comment.id.value,
        userId: comment.userId.value,
        content: comment.content,
        postedAt: comment.postedAt,
      })),
    });
  }

  async insertMany(tasks: Task[]) {
    const [taskRepository] = this.getRepositories.handle(models.Task);

    await taskRepository.save(
      tasks.map((task) => ({
        id: task.id.value,
        name: task.name.value,
        taskAssignment: task.userId && {
          taskId: task.id.value,
          userId: task.userId.value,
        },
        taskComments: task.comments.map((comment) => ({
          id: comment.id.value,
          userId: comment.userId.value,
          content: comment.content,
          postedAt: comment.postedAt,
        })),
      })),
    );
  }

  async update(task: Task) {
    const [taskRepository, taskAssignmentRepository, taskCommentRepository] =
      this.getRepositories.handle(
        models.Task,
        models.TaskAssignment,
        models.TaskComment,
      );

    await taskRepository.update(task.id.value, { name: task.name.value });

    await taskAssignmentRepository.delete({ taskId: task.id.value });
    task.userId &&
      (await taskAssignmentRepository.save({
        taskId: task.id.value,
        userId: task.userId.value,
      }));

    await taskCommentRepository.delete({ taskId: task.id.value });
    await taskCommentRepository.save(
      task.comments.map((comment) => ({
        id: comment.id.value,
        userId: comment.userId.value,
        content: comment.content,
        postedAt: comment.postedAt,
        taskId: task.id.value,
      })),
    );
  }

  async find() {
    const [taskRepository] = this.getRepositories.handle(models.Task);
    const tasks = await taskRepository.find({
      relations: {
        taskAssignment: true,
        taskComments: true,
      },
    });
    return tasks.map((task) =>
      Task.reconstitute(
        new TaskId(task.id),
        new TaskName(task.name),
        task.taskComments.map(
          (taskComment) =>
            new Comment(
              new CommentId(taskComment.id),
              new UserId(taskComment.userId),
              taskComment.content,
              taskComment.postedAt,
            ),
        ),
        task.taskAssignment?.userId && new UserId(task.taskAssignment.userId),
      ),
    );
  }

  async findOneById(id: TaskId) {
    const [taskRepository] = this.getRepositories.handle(models.Task);
    const task = await taskRepository.findOne({
      where: { id: id.value },
      relations: {
        taskAssignment: true,
        taskComments: true,
      },
    });
    return (
      task &&
      Task.reconstitute(
        new TaskId(task.id),
        new TaskName(task.name),
        task.taskComments.map(
          (taskComment) =>
            new Comment(
              new CommentId(taskComment.id),
              new UserId(taskComment.userId),
              taskComment.content,
              taskComment.postedAt,
            ),
        ),
        task.taskAssignment?.userId && new UserId(task.taskAssignment.userId),
      )
    );
  }
}
