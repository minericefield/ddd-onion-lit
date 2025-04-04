export abstract class Logger {
  abstract log(message: any): void;
  abstract error(message: any): void;
  abstract warn(message: any): void;
  abstract debug(message: any): void;
}
