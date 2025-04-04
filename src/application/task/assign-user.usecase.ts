import { Injectable } from '@nestjs/common';

import { TaskId } from '../../domain/task/task-id.value-object';
import { TaskRepository } from '../../domain/task/task.repository';
import { UserId } from '../../domain/user/user-id.value-object';
import { NotFoundApplicationException } from '../shared/application-exception';
import { Logger } from '../shared/logger';
import { RepositoryTransactor } from '../shared/repository-transactor.';

import {
  AssignUserUseCaseRequestDto,
  AssignUserUseCaseResponseDto,
} from './assign-user.usecase.dto';

@Injectable()
export class AssignUserUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly repositoryTransactor: RepositoryTransactor,
    private readonly logger: Logger,
  ) {}

  /**
   * @throws {NotFoundApplicationException}
   */
  async handle(
    requestDto: AssignUserUseCaseRequestDto,
  ): Promise<AssignUserUseCaseResponseDto> {
    return this.repositoryTransactor.handle(async () => {
      /**
       * Find task.
       */
      const task = await this.taskRepository.findOneById(
        new TaskId(requestDto.taskId),
      );
      if (!task) {
        throw new NotFoundApplicationException('Task not found.');
      }

      /**
       * Assign user to task.
       */
      task.assignUser(new UserId(requestDto.userId));

      /**
       * Store it.
       */
      await this.taskRepository.update(task);

      this.logger.log(
        `User ${requestDto.userId} successfully assigned to task ${requestDto.taskId}`,
      );

      return new AssignUserUseCaseResponseDto(task);
    });
  }
}
