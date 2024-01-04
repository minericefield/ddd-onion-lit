import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AssignUserRequest {
  @IsString()
  @ApiProperty()
  readonly userId!: string;
}
