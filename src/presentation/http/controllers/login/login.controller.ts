import {
  Body,
  Controller,
  HttpCode,
  Post,
  Res,
  UseFilters,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { LoginUseCase } from '../../../../application/auth/login.usecase';
import { UserSessionCookie } from '../../cookie/user-session-cookie';
import filters from '../../filters';

import { LoginRequest } from './messages/login.message';

@UseFilters(...filters)
@Controller('login')
export class LoginController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly userSessionCookie: UserSessionCookie,
  ) {}

  @ApiOkResponse()
  @Post()
  @HttpCode(200)
  async login(
    @Body()
    request: LoginRequest,
    @Res()
    response: Response,
  ) {
    const { sessionId } = await this.loginUseCase.handle({
      emailAddress: request.emailAddress,
    });

    this.userSessionCookie.set(response, sessionId);

    response.send();
  }
}
