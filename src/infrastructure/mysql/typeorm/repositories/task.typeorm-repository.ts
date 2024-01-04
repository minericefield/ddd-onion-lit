import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentId } from '../../../../domain/task/comment/comment-id.value-object';
import { Comment } from '../../../../domain/task/comment/comment.entity';
import { TaskId } from '../../../../domain/task/task-id.value-object';
import { TaskName } from '../../../../domain/task/task-name.value-object';
import { Task } from '../../../../domain/task/task.aggregate-root';
import { TaskRepository } from '../../../../domain/task/task.repository';
import { UserId } from '../../../../domain/user/user-id.value-object';
import { Task as TaskTypeormModel } from '../models/task';
import { TaskAssignment as TaskAssignmentTypeormModel } from '../models/task-assignment';
import { TaskComment as TaskCommentTypeormModel } from '../models/task-comment';

@Injectable()
export class TaskTypeormRepository implements TaskRepository {
  constructor(
    @InjectRepository(TaskTypeormModel)
    private readonly taskRepository: Repository<TaskTypeormModel>,
    @InjectRepository(TaskAssignmentTypeormModel)
    private readonly taskAssignmentRepository: Repository<TaskAssignmentTypeormModel>,
    @InjectRepository(TaskCommentTypeormModel)
    private readonly taskCommentRepository: Repository<TaskCommentTypeormModel>,
  ) {}

  async insert(task: Task) {
    await this.taskRepository.save({
      id: task.id.value,
      name: task.name.value,
      taskAssignment: task.userId && {
        taskId: task.id.value,
        userId: task.userId.value,
      },
      taskComments: task.comments.value.map((comment) => ({
        id: comment.id.value,
        userId: comment.userId.value,
        content: comment.content,
        postedAt: comment.postedAt,
      })),
    });
  }

  async update(task: Task) {
    await this.taskRepository.update(task.id.value, { name: task.name.value });

    await this.taskAssignmentRepository.delete({ taskId: task.id.value });
    task.userId &&
      (await this.taskAssignmentRepository.save({
        taskId: task.id.value,
        userId: task.userId.value,
      }));

    await this.taskCommentRepository.delete({ taskId: task.id.value });
    await this.taskCommentRepository.save(
      task.comments.value.map((comment) => ({
        id: comment.id.value,
        userId: comment.userId.value,
        content: comment.content,
        postedAt: comment.postedAt,
        taskId: task.id.value,
      })),
    );
  }

  async find() {
    const tasks = await this.taskRepository.find({
      relations: {
        taskAssignment: true,
        taskComments: true,
      },
    });
    return tasks.map((task) =>
      Task.reconstruct(
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
    const task = await this.taskRepository.findOne({
      where: { id: id.value },
      relations: {
        taskAssignment: true,
        taskComments: true,
      },
    });
    return (
      task &&
      Task.reconstruct(
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
