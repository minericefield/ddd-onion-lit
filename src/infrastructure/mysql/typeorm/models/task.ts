import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

import { TaskAssignment } from './task-assignment';
import { TaskComment } from './task-comment';

@Entity()
export class Task {
  @PrimaryColumn({ type: 'varchar', comment: 'id' })
  id!: string;

  @OneToOne((_) => TaskAssignment, {
    createForeignKeyConstraints: false,
    cascade: true,
  })
  @JoinColumn({ name: 'id', referencedColumnName: 'taskId' })
  taskAssignment?: TaskAssignment;

  @OneToMany((_) => TaskComment, (taskComment) => taskComment.task, {
    cascade: true,
  })
  @JoinColumn()
  taskComments!: TaskComment[];

  @Column({ type: 'varchar', comment: 'name' })
  name!: string;

  @CreateDateColumn({
    type: 'timestamp',
    comment: 'created date',
  })
  readonly createdAt!: Date;
}
