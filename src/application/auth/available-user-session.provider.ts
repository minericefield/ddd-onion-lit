import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../domain/user/user.repository';
import {
  SessionId,
  UserSession,
  UserSessionStorage,
} from '../shared/user-session';

@Injectable()
export class AvailableUserSessionProvider {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userSessionStorage: UserSessionStorage,
  ) {}

  async handle(sessionId: SessionId): Promise<UserSession | undefined> {
    const userSession = await this.userSessionStorage.get(sessionId);
    if (!userSession) {
      return;
    }

    if (!(await this.userRepository.findOneById(userSession.userId))) {
      return;
    }

    return userSession;
  }
}
