import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';

import { Logger } from '../../../application/shared/logger';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    response
      .status(statusCode)
      .json({ statusCode, message: exception.message });
  }
}

@Catch(InternalServerErrorException)
export class InternalServerErrorExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: InternalServerErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    this.logger.error(
      `{ message: ${exception.message}, stack: ${exception.stack}, cause: ${exception.cause} }`,
    );

    response
      .status(statusCode)
      .json({ statusCode, message: 'An unexpected error occurred.' });
  }
}
