import { Module } from '@nestjs/common';

import { UserService } from '../core/user/services/user.service';

import { PostsService } from './posts.service';
import { AnswersService } from './answers/answers.service';
import { CommentSchema } from './schemas/comment.schema';
import { PostSchema } from './schemas/post.schema';
import { AnswerSchema } from './schemas/answer.schema';
import { CommentsService } from './comments/comments.service';
import { PostsResolver } from './posts.resolver';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'Comment', schema: CommentSchema },
      { name: 'Answer', schema: AnswerSchema },
    ]),
  ],
  providers: [AnswersService, CommentsService, UserService, PostsResolver, PostsService],
})
export class PostsModule {}
