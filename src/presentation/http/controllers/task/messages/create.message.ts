import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateTaskRequest {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  readonly name!: string;
}

export class TaskCreatedId {
  @ApiProperty()
  readonly id!: string;
}
