import { Injectable } from '@nestjs/common';

import { CommentIdFactory } from '../../domain/task/comment/comment-id.value-object';
import { Comment } from '../../domain/task/comment/comment.entity';
import { TaskId } from '../../domain/task/task-id.value-object';
import { TaskRepository } from '../../domain/task/task.repository';
import { NotFoundApplicationException } from '../shared/application-exception';
import { RepositoryTransactor } from '../shared/repository-transactor.';

import {
  AddCommentUseCaseRequestDto,
  AddCommentUseCaseResponseDto,
} from './add-comment.usecase.dto';

@Injectable()
export class AddCommentUseCase {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly commentIdFactory: CommentIdFactory,
    private readonly repositoryTransactor: RepositoryTransactor,
  ) {}

  /**
   * @throws {NotFoundApplicationException}
   * @throws {CommentNumberExceededException}
   */
  async handle(
    requestDto: AddCommentUseCaseRequestDto,
  ): Promise<AddCommentUseCaseResponseDto> {
    return this.repositoryTransactor.handle(async () => {
      /**
       * Find task.
       */
      const task = await this.taskRepository.findOneById(
        new TaskId(requestDto.taskId),
      );
      if (!task) {
        throw new NotFoundApplicationException('Task not found.');
      }

      /**
       * Create comment.
       */
      const comment = new Comment(
        await this.commentIdFactory.handle(),
        requestDto.userSession.userId,
        requestDto.comment,
        new Date(),
      );

      /**
       * Add comment to task.
       */
      task.addComment(comment);

      /**
       * Store it.
       */
      await this.taskRepository.update(task);

      return new AddCommentUseCaseResponseDto(comment);
    });
  }
}
