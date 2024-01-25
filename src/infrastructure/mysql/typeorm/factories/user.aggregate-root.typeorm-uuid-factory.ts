import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

import { UserEmailAddress } from '../../../../domain/user/user-email-address.value-object';
import { UserId } from '../../../../domain/user/user-id.value-object';
import { User } from '../../../../domain/user/user.aggregate-root';
import {
  DuplicatedUserEmailAddressException,
  UserFactory,
} from '../../../../domain/user/user.aggregate-root.factory';
import { User as UserTypeormModel } from '../models/user';

@Injectable()
export class UserTypeormUuidFactory implements UserFactory {
  constructor(
    @InjectRepository(UserTypeormModel)
    private readonly userRepository: Repository<UserTypeormModel>,
  ) {}

  async handle(name: string, emailAddress: string) {
    if (
      await this.userRepository.findOne({
        where: { emailAddress },
      })
    ) {
      throw new DuplicatedUserEmailAddressException();
    }

    return new User(new UserId(v4()), name, new UserEmailAddress(emailAddress));
  }
}
