import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { Request } from 'express';

import { AddCommentUseCase } from '../../../../application/task/add-comment.usecase';
import { AssignUserUseCase } from '../../../../application/task/assign-user.usecase';
import { CreateTaskUseCase } from '../../../../application/task/create-task.usecase';
import { FindTaskUseCase } from '../../../../application/task/find-task.usecase';
import { FindTasksUseCase } from '../../../../application/task/find-tasks.usecase';
import filters from '../../filters';
import { AuthGuard } from '../../guards/auth.guard';

import { AddCommentRequest } from './messages/add-comment.message';
import { AssignUserRequest } from './messages/assign-user.message';
import { CreateTaskRequest, TaskCreatedId } from './messages/create.message';
import { TaskDetails } from './messages/find-one.message';
import { TaskListItem } from './messages/find.message';

@UseFilters(...filters)
@UseGuards(AuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(
    private readonly findTasksUseCase: FindTasksUseCase,
    private readonly findTaskUseCase: FindTaskUseCase,
    private readonly createTaskUseCase: CreateTaskUseCase,
    private readonly addCommentUseCase: AddCommentUseCase,
    private readonly assignUserUseCase: AssignUserUseCase,
  ) {}

  @ApiOkResponse({ type: [TaskListItem] })
  @Get()
  async find(): Promise<TaskListItem[]> {
    const { tasks } = await this.findTasksUseCase.handle();

    return tasks;
  }

  @ApiOkResponse({ type: TaskDetails })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<TaskDetails> {
    const { task } = await this.findTaskUseCase.handle({ id });

    return {
      ...task,
      comments: task.comments.map((comment) => ({
        ...comment,
        postedAt: new Date(
          comment.postedAt.year,
          comment.postedAt.month - 1,
          comment.postedAt.date,
          comment.postedAt.hours,
          comment.postedAt.minutes,
        ).toLocaleString(),
      })),
    };
  }

  @ApiCreatedResponse({ type: TaskCreatedId })
  @Post()
  async create(
    @Body()
    request: CreateTaskRequest,
  ): Promise<TaskCreatedId> {
    const { id } = await this.createTaskUseCase.handle({
      taskName: request.name,
    });

    return {
      id,
    };
  }

  @ApiNoContentResponse()
  @Put(':id/comment')
  @HttpCode(204)
  async addComment(
    @Param('id') id: string,
    @Body()
    request: AddCommentRequest,
    @Req()
    { userSession }: Request,
  ) {
    await this.addCommentUseCase.handle({
      taskId: id,
      userSession: userSession,
      comment: request.comment,
    });
  }

  @ApiNoContentResponse()
  @Put(':id/assign')
  @HttpCode(204)
  async assignUser(
    @Param('id') id: string,
    @Body()
    request: AssignUserRequest,
  ) {
    await this.assignUserUseCase.handle({
      taskId: id,
      userId: request.userId,
    });
  }
}
