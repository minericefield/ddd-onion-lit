import { UserId } from '../user/user-id.value-object';

import { Comment } from './comment/comment.entity';
import { Comments } from './comment/comment.entity.first-class-collection';
import { TaskId } from './task-id.value-object';
import { TaskName } from './task-name.value-object';

export class Task {
  private constructor(
    readonly id: TaskId,
    readonly name: TaskName,
    private _comments: Comments,
    private _userId?: UserId,
  ) {}

  get comments() {
    return this._comments.value;
  }

  get userId() {
    return this._userId;
  }

  static create(id: TaskId, name: TaskName) {
    return new Task(id, name, new Comments([]));
  }

  static reconstruct(
    id: TaskId,
    name: TaskName,
    comments: Comment[],
    userId?: UserId,
  ) {
    return new Task(id, name, new Comments(comments), userId);
  }

  addComment(comment: Comment) {
    this._comments = this._comments.add(comment);
  }

  assignUser(userId: UserId) {
    this._userId = userId;
  }
}
