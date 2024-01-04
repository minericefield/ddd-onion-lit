export class TaskId {
  _taskIdBrand!: never;

  constructor(readonly value: string) {}
}

export abstract class TaskIdFactory {
  abstract handle(): TaskId;
}
