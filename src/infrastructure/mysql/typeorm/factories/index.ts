import { UserFactory } from '../../../../domain/user/user.aggregate-root.factory';

import { UserTypeormUuidFactory } from './user.aggregate-root.typeorm-uuid-factory';

export default [
  {
    provide: UserFactory,
    useClass: UserTypeormUuidFactory,
  },
];
