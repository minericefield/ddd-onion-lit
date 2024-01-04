import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../domain/user/user.repository';

import { FindUsersUseCaseResponseDto } from './find-users.usecase.dto';

@Injectable()
export class FindUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async handle(): Promise<FindUsersUseCaseResponseDto> {
    const users = await this.userRepository.find();

    return new FindUsersUseCaseResponseDto(users);
  }
}
