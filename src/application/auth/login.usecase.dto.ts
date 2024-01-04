import { SessionId } from '../shared/user-session';

export interface LoginUseCaseRequestDto {
  readonly emailAddress: string;
}

export class LoginUseCaseResponseDto {
  constructor(readonly sessionId: SessionId) {}
}
