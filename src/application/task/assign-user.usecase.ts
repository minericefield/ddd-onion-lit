import { Injectable } from '@nestjs/common';

import { TaskId } from '../../domain/task/task-id.value-object';
import { TaskRepository } from '../../domain/task/task.repository';
import { UserId } from '../../domain/user/user-id.value-object';
import { NotFoundApplicationException } from '../shared/application-exception';

import {
  AssignUserUseCaseRequestDto,
  AssignUserUseCaseResponseDto,
} from './assign-user.usecase.dto';

@Injectable()
export class AssignUserUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  /**
   * @throws {NotFoundApplicationException}
   */
  async handle(
    requestDto: AssignUserUseCaseRequestDto,
  ): Promise<AssignUserUseCaseResponseDto> {
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

    return new AssignUserUseCaseResponseDto(task);
  }
}
