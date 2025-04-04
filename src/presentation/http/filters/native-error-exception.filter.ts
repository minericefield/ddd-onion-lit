import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { Logger } from '../../../application/shared/logger';

@Catch(Error)
export class NativeErrorExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(
      `{ message: ${exception.message}, stack: ${exception.stack}, cause: ${exception.cause} }`,
    );

    response
      .status(statusCode)
      .json({ statusCode, message: 'An unexpected error occurred.' });
  }
}
