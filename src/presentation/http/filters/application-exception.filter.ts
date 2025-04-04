import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import {
  AuthenticationFailedApplicationException,
  NotFoundApplicationException,
  UnexpectedApplicationException,
} from '../../../application/shared/application-exception';
import { Logger } from '../../../application/shared/logger';

@Catch(NotFoundApplicationException)
export class NotFoundApplicationExceptionFilter implements ExceptionFilter {
  catch(exception: NotFoundApplicationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.NOT_FOUND;

    response
      .status(statusCode)
      .json({ statusCode, message: exception.message });
  }
}

@Catch(AuthenticationFailedApplicationException)
export class AuthenticationFailedApplicationExceptionFilter
  implements ExceptionFilter
{
  catch(
    exception: AuthenticationFailedApplicationException,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.UNAUTHORIZED;

    response
      .status(statusCode)
      .json({ statusCode, message: exception.message });
  }
}

@Catch(UnexpectedApplicationException)
export class UnexpectedApplicationExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: UnexpectedApplicationException, host: ArgumentsHost) {
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
