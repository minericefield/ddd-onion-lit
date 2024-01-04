import { Comment } from '../../domain/task/comment/comment.entity';
import { UserSession } from '../shared/user-session';

export interface AddCommentUseCaseRequestDto {
  readonly taskId: string;
  readonly userSession: UserSession;
  readonly comment: string;
}

export class AddCommentUseCaseResponseDto {
  readonly id: string;

  constructor(comment: Comment) {
    this.id = comment.id.value;
  }
}
