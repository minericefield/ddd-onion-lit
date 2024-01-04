import { Injectable } from '@nestjs/common';

import { TaskId } from '../../domain/task/task-id.value-object';
import { TaskRepository } from '../../domain/task/task.repository';
import { NotFoundApplicationException } from '../shared/application-exception';

import {
  FindTaskUseCaseRequestDto,
  FindTaskUseCaseResponseDto,
} from './find-task.usecase.dto';

@Injectable()
export class FindTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  /**
   * @throws {NotFoundApplicationException}
   */
  async handle(
    requestDto: FindTaskUseCaseRequestDto,
  ): Promise<FindTaskUseCaseResponseDto> {
    const task = await this.taskRepository.findOneById(
      new TaskId(requestDto.id),
    );
    if (!task) {
      throw new NotFoundApplicationException('Task not found.');
    }

    return new FindTaskUseCaseResponseDto(task);
  }
}
