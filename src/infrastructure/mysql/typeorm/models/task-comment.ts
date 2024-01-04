import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Task } from './task';
import { User } from './user';

@Entity()
export class TaskComment {
  @PrimaryColumn({ type: 'varchar', comment: 'id' })
  id!: string;

  @Column({ type: 'varchar', comment: 'task id' })
  taskId!: string;

  @ManyToOne((_) => Task, (task) => task.taskComments)
  @JoinColumn()
  task!: Task;

  @Column({ type: 'varchar', comment: 'user id' })
  userId!: string;

  @ManyToOne((_) => User, (user) => user.taskComments)
  @JoinColumn()
  user!: User;

  @Column({ type: 'text', comment: 'comment content' })
  content!: string;

  @Column({ type: 'timestamp', comment: 'posted date' })
  readonly postedAt!: Date;

  @CreateDateColumn({ type: 'timestamp', comment: 'created date' })
  readonly createdAt!: Date;
}
