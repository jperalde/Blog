import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '../core/user/services/user.service';
import { UserModule } from '../core/user/user.module';
import { AnswersService } from './answers/answers.service';
import { CommentsService } from './comments/comments.service';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { AnswerSchema } from './schemas/answer.schema';
import { CommentSchema } from './schemas/comment.schema';
import { PostSchema } from './schemas/post.schema';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: 'Post', schema: PostSchema },
      { name: 'Comment', schema: CommentSchema },
      { name: 'Answer', schema: AnswerSchema },
    ]),
  ],
  providers: [AnswersService, CommentsService, UserService, PostsResolver, PostsService],
})
export class PostsModule {}
