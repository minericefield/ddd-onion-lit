import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TaskListItem {
  @ApiProperty()
  readonly id!: string;
  @ApiProperty()
  readonly name!: string;
  @ApiPropertyOptional()
  readonly userName?: string;
}
