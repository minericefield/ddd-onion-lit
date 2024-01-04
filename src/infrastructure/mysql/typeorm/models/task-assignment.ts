import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from './user';

@Entity()
export class TaskAssignment {
  @PrimaryGeneratedColumn({ comment: 'id' })
  id: number;

  @Column({ type: 'varchar', comment: 'task id' })
  taskId!: string;

  /**
   * To avoid "Cyclic dependency" error
   * @see: https://github.com/typeorm/typeorm/issues/4385
   */
  // @OneToOne((_) => Task)
  // @JoinColumn({ name: 'task_id', referencedColumnName: 'id' })
  // task!: Task;

  @Column({ type: 'varchar', comment: 'user id' })
  userId!: string;

  @ManyToOne((_) => User, (user) => user.taskAssignments)
  @JoinColumn()
  user!: User;

  @CreateDateColumn({
    type: 'timestamp',
    comment: 'created date',
  })
  readonly createdAt!: Date;
}
