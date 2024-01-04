import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors) => {
        throw new BadRequestException(
          validationErrors
            .map(({ constraints }) => Object.values(constraints))
            .flat()
            .join(','),
        );
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('ddd-onion-lit')
    .setDescription('ddd-onion-lit api doc')
    .setVersion('0.0.1')
    .addTag('ddd-onion-lit')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
  Logger.debug('Check it out at localhost:3000/swagger !');
}
bootstrap();
