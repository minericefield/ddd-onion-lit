import { AllExceptionFilter } from './all-exception.filter';
import {
  NotFoundApplicationExceptionFilter,
  UnexpectedApplicationExceptionFilter,
} from './application-exception.filter';
import {
  ValidationDomainExceptionFilter,
  UnexpectedDomainExceptionFilter,
} from './domain-exception.filter';
import {
  HttpExceptionFilter,
  InternalServerErrorExceptionFilter,
} from './http-exception.filter';
import { NativeErrorExceptionFilter } from './native-error-exception.filter';

export default [
  AllExceptionFilter,
  NativeErrorExceptionFilter,
  HttpExceptionFilter,
  InternalServerErrorExceptionFilter,
  UnexpectedApplicationExceptionFilter,
  NotFoundApplicationExceptionFilter,
  UnexpectedDomainExceptionFilter,
  ValidationDomainExceptionFilter,
];
