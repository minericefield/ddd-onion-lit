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

export default [
  AllExceptionFilter,
  HttpExceptionFilter,
  InternalServerErrorExceptionFilter,
  UnexpectedApplicationExceptionFilter,
  NotFoundApplicationExceptionFilter,
  UnexpectedDomainExceptionFilter,
  ValidationDomainExceptionFilter,
];
