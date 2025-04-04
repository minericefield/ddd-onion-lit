import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

import { Logger } from '../../application/shared/logger';
import { CreateOnboardingTasksUseCase } from '../../application/task/create-onboarding-tasks.usecse';
import { UserCreated } from '../../domain/user/user-created.domain-event';
import { AlsThreadContext } from '../node-async-hooks/als-thread-context';

@Injectable()
export class NestjsEventEmitterUserCreatedDomainEventListener {
  constructor(
    private readonly createOnboardingTasksUseCase: CreateOnboardingTasksUseCase,
    private readonly alsThreadContext: AlsThreadContext,
    private readonly logger: Logger,
  ) {}

  @OnEvent(UserCreated.name, { async: true, promisify: true })
  async handle(userCreated: UserCreated) {
    return this.alsThreadContext.run(async () => {
      this.logger.log(
        `UserCreatedDomainEventListener called. user id: ${userCreated.userId}`,
      );

      await this.createOnboardingTasksUseCase.handle({
        userId: userCreated.userId.value,
      });
    });
  }
}
