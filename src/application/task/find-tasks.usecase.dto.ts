export interface FindTasksUseCaseResponseDto {
  readonly tasks: {
    id: string;
    name: string;
    userName?: string;
  }[];
}
