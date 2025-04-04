import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { Logger } from './application/shared/logger';
import { CreateOnboardingTasksUseCase } from './application/task/create-onboarding-tasks.usecse';
import { CreateUserUseCase } from './application/user/create-user.usecase';
import { DomainEventPublisher } from './domain/shared/domain-event-publisher';
import { CreateOnboardingTasks } from './domain/task/create-onboarding-tasks.domain-service';
import { TaskIdFactory } from './domain/task/task-id.value-object';
import { UserEmailAddressIsNotDuplicated } from './domain/user/user-email-address-is-not-duplicated.domain-service';
import { UserIdFactory } from './domain/user/user-id.value-object';
import { TypeormModule } from './infrastructure/mysql/typeorm/typeorm.module';
import { NestjsCommonConsoleLoggerModule } from './infrastructure/nestjs-common/nestjs-common-console-logger.module';
import { NestjsEventEmitterDomainEventPublisher } from './infrastructure/nestjs-event-emitter/nestjs-event-emitter-domain-event-publisher';
import { NestjsEventEmitterUserCreatedDomainEventListener } from './infrastructure/nestjs-event-emitter/nestjs-event-emitter-user-created-domain-event-listener';
import { AlsThreadContext } from './infrastructure/node-async-hooks/als-thread-context';
import { AlsThreadContextModule } from './infrastructure/node-async-hooks/als-thread-context.module';
import { TaskIdUuidV4Factory } from './infrastructure/uuid/task-id.value-object.uuid-v4-factory';
import { UserIdUuidV4Factory } from './infrastructure/uuid/user-id.value-object.uuid-v4-factory';
import { CreateUserCommander } from './presentation/nest-commander/create-user.commander';
import { SeedUserCommander } from './presentation/nest-commander/seed-user.commander';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot(),
    TypeormModule,
    AlsThreadContextModule,
    NestjsCommonConsoleLoggerModule,
  ],
  providers: [
    {
      provide: TaskIdFactory,
      useClass: TaskIdUuidV4Factory,
    },
    {
      provide: UserIdFactory,
      useClass: UserIdUuidV4Factory,
    },
    CreateOnboardingTasks,
    UserEmailAddressIsNotDuplicated,
    CreateUserUseCase,
    CreateOnboardingTasksUseCase,
    {
      provide: CreateUserCommander,
      useFactory: (
        createUserUseCase: CreateUserUseCase,
        alsThreadContext: AlsThreadContext,
        logger: Logger,
      ) =>
        new CreateUserCommander(
          createUserUseCase,
          (run) => alsThreadContext.run(run),
          logger,
        ),
      inject: [CreateUserUseCase, AlsThreadContext, Logger],
    },
    {
      provide: SeedUserCommander,
      useFactory: (
        createUserUseCase: CreateUserUseCase,
        alsThreadContext: AlsThreadContext,
      ) =>
        new SeedUserCommander(createUserUseCase, (run) =>
          alsThreadContext.run(run),
        ),
      inject: [CreateUserUseCase, AlsThreadContext],
    },
    {
      provide: DomainEventPublisher,
      useClass: NestjsEventEmitterDomainEventPublisher,
    },
    NestjsEventEmitterUserCreatedDomainEventListener,
  ],
})
export class CommanderModule {}
