import { Injectable } from '@nestjs/common';

import { FindTasksQueryService } from './find-tasks.query-service';
import { FindTasksUseCaseResponseDto } from './find-tasks.usecase.dto';

@Injectable()
export class FindTasksUseCase {
  constructor(private readonly findTasksQueryService: FindTasksQueryService) {}

  async handle(): Promise<FindTasksUseCaseResponseDto> {
    const { tasks } = await this.findTasksQueryService.handle();

    return { tasks };
  }
}
