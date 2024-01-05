import { UserId } from '../../domain/user/user-id.value-object';

export type SessionId = string;
export type UserSession = {
  /**
   * To prevent domain objects from being referenced by clients of application service (e.g., controller),
   * you may use the simple string type instead of the UserId type.
   */
  readonly userId: UserId;
};

export abstract class UserSessionStorage {
  abstract get(sessionId: SessionId): Promise<UserSession | undefined>;
  abstract set(userSession: UserSession): Promise<SessionId>;
}
