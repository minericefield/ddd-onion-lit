import { Injectable } from '@nestjs/common';

import { CreateOnboardingTasks } from '../../domain/task/create-onboarding-tasks.domain-service';
import { TaskRepository } from '../../domain/task/task.repository';
import { UserId } from '../../domain/user/user-id.value-object';
import { UserRepository } from '../../domain/user/user.repository';
import { NotFoundApplicationException } from '../shared/application-exception';
import { Logger } from '../shared/logger';
import { RepositoryTransactor } from '../shared/repository-transactor.';

import {
  CreateOnboardingTasksUseCaseRequestDto,
  CreateOnboardingTasksUseCaseResponseDto,
} from './create-onboarding-tasks.usecase.dto';

@Injectable()
export class CreateOnboardingTasksUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly userRepository: UserRepository,
    private readonly createOnboardingTasks: CreateOnboardingTasks,
    private readonly repositoryTransactor: RepositoryTransactor,
    private readonly logger: Logger,
  ) {}

  /**
   * @throws {NotFoundApplicationException}
   */
  async handle(
    requestDto: CreateOnboardingTasksUseCaseRequestDto,
  ): Promise<CreateOnboardingTasksUseCaseResponseDto> {
    return this.repositoryTransactor.handle(async () => {
      /**
       * Find user.
       */
      const userId = new UserId(requestDto.userId);
      if (!(await this.userRepository.findOneById(userId))) {
        throw new NotFoundApplicationException('User not found.');
      }

      /**
       * Create onboarding tasks.
       */
      const tasks = await this.createOnboardingTasks.handle(userId);
      await this.taskRepository.insertMany(tasks);

      this.logger.log(`Onboarding tasks created for user id: ${userId.value}`);

      return new CreateOnboardingTasksUseCaseResponseDto(tasks);
    });
  }
}
