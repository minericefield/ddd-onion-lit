import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

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
  catch(exception: UnexpectedDomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    Logger.error(exception);

    response
      .status(statusCode)
      .json({ statusCode, message: 'An unexpected error ocurred.' });
  }
}
