import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { AvailableUserSessionProvider } from '../../../application/auth/available-user-session.provider';
import { UserSessionCookie } from '../cookie/user-session-cookie';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userSessionCookie: UserSessionCookie,
    private readonly availableUserSessionProvider: AvailableUserSessionProvider,
  ) {}

  async canActivate(context: ExecutionContext) {
    const httpContext = context.switchToHttp();
    const req = httpContext.getRequest<Request>();

    const sessionId = this.userSessionCookie.get(req);
    if (!sessionId) throw new UnauthorizedException('Authentication required.');

    const userSession =
      await this.availableUserSessionProvider.handle(sessionId);
    if (!userSession)
      throw new UnauthorizedException('Authentication required.');

    req.userSession = userSession;

    return true;
  }
}
