import { ApiProperty } from '@nestjs/swagger';

export class UserListItem {
  @ApiProperty()
  readonly id!: string;
  @ApiProperty()
  readonly name!: string;
  @ApiProperty()
  readonly emailAddress!: string;
}
