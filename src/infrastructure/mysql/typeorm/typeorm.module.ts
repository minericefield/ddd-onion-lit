import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

import models from './models';
import SnakeNamingAndPluralTableNameStrategy from './naming-strategies/snake-naming-and-plural-table-name';
import queryServices from './query-services';
import repositories from './repositories';
import GetRepositories from './repositories/shared/get-typeorm-repositories';
import transactors from './transactors';

/**
 * DDD's modules should be bounded from a domain perspective.
 * TypeormModule is kind of a NestJS way.
 */
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE'),
        entities: [...Object.values(models)],
        logging: true,
        synchronize: true, // !!! Not recommended for production. Better to use other controllable migration tool.
        namingStrategy: new SnakeNamingAndPluralTableNameStrategy(),
      }),
      dataSourceFactory: (options) => new DataSource(options).initialize(),
    }),
    TypeOrmModule.forFeature([...Object.values(models)]),
  ],
  providers: [
    GetRepositories,
    ...repositories,
    ...queryServices,
    ...transactors,
  ],
  exports: [...repositories, ...queryServices, ...transactors],
})
export class TypeormModule {}
