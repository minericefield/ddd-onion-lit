import { Injectable } from '@nestjs/common';

import { TaskIdFactory } from '../../domain/task/task-id.value-object';
import { TaskName } from '../../domain/task/task-name.value-object';
import { Task } from '../../domain/task/task.aggregate-root';
import { TaskRepository } from '../../domain/task/task.repository';
import { RepositoryTransactor } from '../shared/repository-transactor.';

import {
  CreateTaskUseCaseRequestDto,
  CreateTaskUseCaseResponseDto,
} from './create-task.usecase.dto';

@Injectable()
export class CreateTaskUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskIdFactory: TaskIdFactory,
    private readonly repositoryTransactor: RepositoryTransactor,
  ) {}

  /**
   * @throws {TaskNameCharactersExceededException}
   */
  async handle(
    requestDto: CreateTaskUseCaseRequestDto,
  ): Promise<CreateTaskUseCaseResponseDto> {
    return this.repositoryTransactor.handle(async () => {
      /**
       * Create task.
       */
      const task = Task.create(
        await this.taskIdFactory.handle(),
        new TaskName(requestDto.taskName),
      );

      /**
       * Store it.
       */
      await this.taskRepository.insert(task);

      return new CreateTaskUseCaseResponseDto(task);
    });
  }
}
