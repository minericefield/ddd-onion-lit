import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CreateUserUseCase } from './application/user/create-user.usecase';
import { UserEmailAddressIsNotDuplicated } from './domain/user/user-email-address-is-not-duplicated.domain-service';
import { UserIdFactory } from './domain/user/user-id.value-object';
import { TypeormModule } from './infrastructure/mysql/typeorm/typeorm.module';
import { UserIdUuidV4Factory } from './infrastructure/uuid/user-id.value-object.uuid-v4-factory';
import { CreateUserCommander } from './presentation/nest-commander/create-user.commander';
import { SeedUserCommander } from './presentation/nest-commander/seed-user.commander';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeormModule],
  providers: [
    {
      provide: UserIdFactory,
      useClass: UserIdUuidV4Factory,
    },
    UserEmailAddressIsNotDuplicated,
    CreateUserUseCase,
    CreateUserCommander,
    SeedUserCommander,
  ],
})
export class CommanderModule {}
