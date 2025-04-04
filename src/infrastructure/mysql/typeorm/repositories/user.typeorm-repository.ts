import { Injectable } from '@nestjs/common';

import { UserEmailAddress } from '../../../../domain/user/user-email-address.value-object';
import { UserId } from '../../../../domain/user/user-id.value-object';
import { User } from '../../../../domain/user/user.aggregate-root';
import { UserRepository } from '../../../../domain/user/user.repository';
import { User as UserTypeormModel } from '../models/user';

import GetTypeormRepositories from './shared/get-typeorm-repositories';

@Injectable()
export class UserTypeormRepository implements UserRepository {
  constructor(private readonly getRepositories: GetTypeormRepositories) {}

  async insert(user: User) {
    const [userRepository] = this.getRepositories.handle(UserTypeormModel);
    await userRepository.save({
      id: user.id.value,
      name: user.name,
      emailAddress: user.emailAddress.value,
    });
  }

  async find() {
    const [userRepository] = this.getRepositories.handle(UserTypeormModel);
    const users = await userRepository.find();
    return users.map((user) => {
      return User.reconstitute(
        new UserId(user.id),
        user.name,
        new UserEmailAddress(user.emailAddress),
      );
    });
  }

  async findOneById(id: UserId) {
    const [userRepository] = this.getRepositories.handle(UserTypeormModel);
    const user = await userRepository.findOne({
      where: { id: id.value },
    });
    return (
      user &&
      User.reconstitute(
        new UserId(user.id),
        user.name,
        new UserEmailAddress(user.emailAddress),
      )
    );
  }

  async findOneByEmailAddress(emailAddress: UserEmailAddress) {
    const [userRepository] = this.getRepositories.handle(UserTypeormModel);
    const user = await userRepository.findOne({
      where: { emailAddress: emailAddress.value },
    });
    return (
      user &&
      User.reconstitute(
        new UserId(user.id),
        user.name,
        new UserEmailAddress(user.emailAddress),
      )
    );
  }
}
