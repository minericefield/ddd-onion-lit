import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  Unique,
} from 'typeorm';

import { TaskAssignment } from './task-assignment';
import { TaskComment } from './task-comment';

@Entity()
@Unique(['emailAddress'])
export class User {
  @PrimaryColumn({ type: 'varchar', comment: 'id' })
  id!: string;

  @OneToMany((_) => TaskAssignment, (taskAssignment) => taskAssignment.user)
  @JoinColumn()
  taskAssignments!: TaskAssignment[];

  @OneToMany((_) => TaskComment, (taskComment) => taskComment.user)
  @JoinColumn()
  taskComments!: TaskComment[];

  @Column({ type: 'varchar', comment: 'name' })
  name!: string;

  @Column({ type: 'varchar', comment: 'email address' })
  emailAddress!: string;

  @CreateDateColumn({ type: 'timestamp', comment: 'created date' })
  readonly createdAt!: Date;
}
