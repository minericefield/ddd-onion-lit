import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { Logger } from '../../../application/shared/logger';
import {
  ValidationDomainException,
  UnexpectedDomainException,
} from '../../../domain/shared/domain-exception';

@Catch(ValidationDomainException)
export class ValidationDomainExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationDomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.BAD_REQUEST;

    response
      .status(statusCode)
      .json({ statusCode, message: exception.message });
  }
}

@Catch(UnexpectedDomainException)
export class UnexpectedDomainExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: UnexpectedDomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(
      JSON.stringify({
        message: exception.message,
        stack: exception.stack,
        cause: exception.cause,
      }),
    );

    response
      .status(statusCode)
      .json({ statusCode, message: 'An unexpected error occurred.' });
  }
}
