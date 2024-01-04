import 'express';
import { UserId } from '../src/domain/user/user-id.value-object';

declare module 'express' {
  export interface Request {
    userSession?: {
      userId: UserId;
    };
  }
}
