import { UserId } from '../../domain/user/user-id.value-object';

export type SessionId = string;
export type UserSession = {
  readonly userId: UserId;
};

export abstract class UserSessionStorage {
  abstract get(sessionId: SessionId): Promise<UserSession | undefined>;
  abstract set(userSession: UserSession): Promise<SessionId>;
}
