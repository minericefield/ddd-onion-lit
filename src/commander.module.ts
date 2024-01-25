import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CreateUserUseCase } from './application/user/create-user.usecase';
import { TypeormModule } from './infrastructure/mysql/typeorm/typeorm.module';
import { CreateUserCommander } from './presentation/nest-commander/create-user.commander';
import { SeedUserCommander } from './presentation/nest-commander/seed-user.commander';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TypeormModule],
  providers: [CreateUserUseCase, CreateUserCommander, SeedUserCommander],
})
export class CommanderModule {}
