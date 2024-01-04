import { ValidationDomainException } from '../shared/domain-exception';

export class TaskName {
  private static readonly TASK_NAME_CHARACTERS_LIMIT = 50;

  private _value: string;

  constructor(value: string) {
    if (value.length > TaskName.TASK_NAME_CHARACTERS_LIMIT) {
      throw new TaskNameCharactersExceededException(
        TaskName.TASK_NAME_CHARACTERS_LIMIT,
      );
    }
    this._value = value;
  }

  get value() {
    return this._value;
  }
}

export class TaskNameCharactersExceededException extends ValidationDomainException {
  constructor(taskNameCharactersLimit: number) {
    super(
      `Task name can't be longer than ${taskNameCharactersLimit} characters.`,
    );
  }
}
