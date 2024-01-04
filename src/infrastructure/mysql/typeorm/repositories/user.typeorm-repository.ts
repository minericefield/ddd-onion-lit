import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEmailAddress } from '../../../../domain/user/user-email-address.value-object';
import { UserId } from '../../../../domain/user/user-id.value-object';
import { User } from '../../../../domain/user/user.aggregate-root';
import { UserRepository } from '../../../../domain/user/user.repository';
import { User as UserTypeormModel } from '../models/user';

@Injectable()
export class UserTypeormRepository implements UserRepository {
  constructor(
    @InjectRepository(UserTypeormModel)
    private readonly userRepository: Repository<UserTypeormModel>,
  ) {}

  async insert(user: User) {
    await this.userRepository.save({
      id: user.id.value,
      name: user.name,
      emailAddress: user.emailAddress.value,
    });
  }

  async find() {
    const users = await this.userRepository.find();
    return users.map((user) => {
      return new User(
        new UserId(user.id),
        user.name,
        new UserEmailAddress(user.emailAddress),
      );
    });
  }

  async findOneById(id: UserId) {
    const user = await this.userRepository.findOne({
      where: { id: id.value },
    });
    return (
      user &&
      new User(
        new UserId(user.id),
        user.name,
        new UserEmailAddress(user.emailAddress),
      )
    );
  }

  async findOneByEmailAddress(emailAddress: UserEmailAddress) {
    const user = await this.userRepository.findOne({
      where: { emailAddress: emailAddress.value },
    });
    return (
      user &&
      new User(
        new UserId(user.id),
        user.name,
        new UserEmailAddress(user.emailAddress),
      )
    );
  }
}
