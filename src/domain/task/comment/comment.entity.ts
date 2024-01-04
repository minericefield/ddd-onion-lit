import { UserId } from '../../user/user-id.value-object';

import { CommentId } from './comment-id.value-object';

export class Comment {
  constructor(
    readonly id: CommentId,
    readonly userId: UserId,
    readonly content: string,
    readonly postedAt: Date,
  ) {}
}
