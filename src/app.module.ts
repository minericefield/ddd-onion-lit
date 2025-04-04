import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AvailableUserSessionProvider } from './application/auth/available-user-session.provider';
import { LoginUseCase } from './application/auth/login.usecase';
import { Logger } from './application/shared/logger';
import { UserSessionStorage } from './application/shared/user-session';
import { AddCommentUseCase } from './application/task/add-comment.usecase';
import { AssignUserUseCase } from './application/task/assign-user.usecase';
import { CreateTaskUseCase } from './application/task/create-task.usecase';
import { FindTaskUseCase } from './application/task/find-task.usecase';
import { FindTasksUseCase } from './application/task/find-tasks.usecase';
import { FindUsersUseCase } from './application/user/find-users.usecase';
import { CommentIdFactory } from './domain/task/comment/comment-id.value-object';
import { TaskIdFactory } from './domain/task/task-id.value-object';
import { UserSessionInMemoryStorage } from './infrastructure/in-memory/user-session.in-memory-storage';
import { TypeormModule } from './infrastructure/mysql/typeorm/typeorm.module';
import { NestjsCommonConsoleLogger } from './infrastructure/nestjs-common/nestjs-common-console-logger';
import { AlsThreadContext } from './infrastructure/node-async-hooks/als-thread-context';
import { AlsThreadContextModule } from './infrastructure/node-async-hooks/als-thread-context.module';
import { CommentIdUuidV4Factory } from './infrastructure/uuid/comment-id.value-object.uuid-v4-factory';
import { TaskIdUuidV4Factory } from './infrastructure/uuid/task-id.value-object.uuid-v4-factory';
import { LoginController } from './presentation/http/controllers/login/login.controller';
import { TaskController } from './presentation/http/controllers/task/task.controller';
import { UserController } from './presentation/http/controllers/user/user.controller';
import { UserSessionCookie } from './presentation/http/cookie/user-session-cookie';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeormModule,
    AlsThreadContextModule,
  ],
  controllers: [TaskController, UserController, LoginController],
  providers: [
    {
      provide: TaskIdFactory,
      useClass: TaskIdUuidV4Factory,
    },
    {
      provide: CommentIdFactory,
      useClass: CommentIdUuidV4Factory,
    },
    AvailableUserSessionProvider,
    FindTasksUseCase,
    FindTaskUseCase,
    CreateTaskUseCase,
    AddCommentUseCase,
    AssignUserUseCase,
    FindUsersUseCase,
    LoginUseCase,
    {
      provide: UserSessionStorage,
      useClass: UserSessionInMemoryStorage,
    },
    UserSessionCookie,
    {
      provide: Logger,
      useClass: NestjsCommonConsoleLogger,
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly alsThreadContext: AlsThreadContext) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((_req, _res, next) => {
        this.alsThreadContext.run(next);
      })
      .forRoutes('*');
  }
}
