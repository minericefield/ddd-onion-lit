import { ValidationDomainException } from '../../shared/domain-exception';

import { Comment } from './comment.entity';

export class Comments {
  private static readonly COMMENT_NUMBER_LIMIT = 20;

  constructor(private readonly _value: Comment[]) {}

  get value() {
    return [...this._value].sort(
      (commentA, commentB) =>
        -(commentA.postedAt.getTime() - commentB.postedAt.getTime()),
    );
  }

  add(comment: Comment) {
    if (this._value.length >= Comments.COMMENT_NUMBER_LIMIT) {
      throw new CommentNumberExceededException(Comments.COMMENT_NUMBER_LIMIT);
    }

    return new Comments([...this._value, comment]);
  }
}

export class CommentNumberExceededException extends ValidationDomainException {
  constructor(commentNumberLimit: number) {
    super(`Can't add more than ${commentNumberLimit} comments.`);
  }
}
