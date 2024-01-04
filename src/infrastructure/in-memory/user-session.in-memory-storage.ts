import { Injectable } from '@nestjs/common';

import {
  SessionId,
  UserSession,
  UserSessionStorage,
} from '../../application/shared/user-session';

@Injectable()
export class UserSessionInMemoryStorage implements UserSessionStorage {
  private readonly value: Map<SessionId, UserSession> = new Map();

  async get(sessionId: SessionId) {
    const userSession = this.value.get(sessionId);

    return userSession;
  }

  async set(userSession: UserSession) {
    const sessionId = Math.random().toString();
    this.value.set(sessionId, userSession);

    return sessionId;
  }
}
