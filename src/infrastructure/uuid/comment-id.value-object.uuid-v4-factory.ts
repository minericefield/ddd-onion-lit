import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import {
  CommentId,
  CommentIdFactory,
} from '../../domain/task/comment/comment-id.value-object';

/**
 * CommentId is a local identity and it doesn't need to be globally unique.
 * Using uuid framework just to implement it simply.
 */
@Injectable()
export class CommentIdUuidV4Factory implements CommentIdFactory {
  handle() {
    return new CommentId(v4());
  }
}
