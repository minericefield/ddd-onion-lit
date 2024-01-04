import {
  ApiExtraModels,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class TasksDetailsComment {
  @ApiProperty()
  readonly id!: string;
  @ApiProperty()
  readonly userId!: string;
  @ApiProperty()
  readonly content!: string;
  @ApiProperty()
  readonly postedAt!: string;
}

@ApiExtraModels(TasksDetailsComment)
export class TaskDetails {
  @ApiProperty()
  readonly id!: string;
  @ApiProperty()
  readonly name!: string;
  @ApiPropertyOptional()
  readonly userId?: string;
  @ApiProperty({ type: () => TasksDetailsComment, isArray: true })
  readonly comments: TasksDetailsComment[];
}
