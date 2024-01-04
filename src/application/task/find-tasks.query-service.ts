export abstract class FindTasksQueryService {
  abstract handle(): Promise<FindTasksQueryServiceResponseDto>;
}

export interface FindTasksQueryServiceResponseDto {
  readonly tasks: {
    id: string;
    name: string;
    userName?: string;
  }[];
}
