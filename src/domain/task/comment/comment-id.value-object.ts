export class CommentId {
  _commentIdBrand!: never;

  constructor(readonly value: string) {}
}

export abstract class CommentIdFactory {
  abstract handle(): CommentId;
}
