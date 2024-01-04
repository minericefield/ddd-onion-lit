import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response, Request } from 'express';

import { SessionId } from '../../../application/shared/user-session';

@Injectable()
export class UserSessionCookie {
  private static readonly COOKIE_NAME = 'ddd-onion-lit_usid';
  private static readonly COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 * 30;

  constructor(private readonly configService: ConfigService) {}

  get(request: Request): SessionId | undefined {
    return request.cookies[UserSessionCookie.COOKIE_NAME];
  }

  set(response: Response, sessionId: SessionId) {
    response.cookie(UserSessionCookie.COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production', // NODE_ENV may should be referenced from process.env rather than ConfigService.
      maxAge: UserSessionCookie.COOKIE_MAX_AGE,
    });
  }
}
