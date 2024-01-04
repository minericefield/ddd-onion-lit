import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * http message
 */
export class LoginRequest {
  @IsString()
  @ApiProperty()
  readonly emailAddress!: string;
}
