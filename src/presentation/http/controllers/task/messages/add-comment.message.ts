import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class AddCommentRequest {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  readonly comment!: string;
}
