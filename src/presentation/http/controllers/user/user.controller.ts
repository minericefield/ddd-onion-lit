import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { FindUsersUseCase } from '../../../../application/user/find-users.usecase';
import filters from '../../filters';
import { AuthGuard } from '../../guards/auth.guard';

import { UserListItem } from './messages/find.message';

@UseFilters(...filters)
@UseGuards(AuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly findUsersUseCase: FindUsersUseCase) {}

  @ApiOkResponse({ type: [UserListItem] })
  @Get()
  async find(): Promise<UserListItem[]> {
    const { users } = await this.findUsersUseCase.handle();

    return users;
  }
}
