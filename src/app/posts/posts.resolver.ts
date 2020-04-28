import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from '../core/auth/controllers/gql-auth.guard';
import { CurrentUser } from '../core/auth/decorators/current-user.decorator';
import { User } from '../core/user/model/user.model';
import { UserService } from '../core/user/services/user.service';
import { CommentsService } from './comments/comments.service';
import { NewCommentInput } from './comments/dto/new-comment.input';
import { Comment } from './comments/models/comments.model';
import { NewPostInput } from './dto/new-post.input';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';
import { NewAnswerInput } from './answers/dto/new-answer.input';
import { Answer } from './answers/models/answer.model';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService,
    private userService: UserService,
  ) {}

  @Query(() => [Post])
  async allPosts(): Promise<Post[]> {
    return await this.postsService.findAll();
  }

  @Query(() => Post)
  async postOfId(@Args('id', { type: () => String }) id: string): Promise<Post> {
    const postit = await this.postsService.findOneById(id);
    if (!postit) {
      throw new NotFoundException(id);
    }
    return postit[0];
  }
  @Query(() => Comment)
  async commentsOfId(@Args('id', { type: () => String }) id: string): Promise<Comment> {
    const comment = await this.commentsService.findOneById(id);
    if (!comment) {
      throw new NotFoundException(id);
    }
    return comment[0];
  }
  @Query(() => [Post])
  async postsOfTopic(@Args('category', { type: () => String }) category: string): Promise<Post[]> {
    const postit: Post[] = await this.postsService.findOneByTopic(category);
    if (!postit) {
      throw new NotFoundException(category);
    }
    return postit;
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async newPost(@CurrentUser() user: User, @Args('newPostInput') newPostInput: NewPostInput): Promise<Post> {
    if (this.userService.findOne(user.username)!) {
      throw new NotFoundException('Username may not exist or password incorrect');
    }
    const post = await this.postsService.create(newPostInput);
    return post;
  }

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  async newComment(
    @CurrentUser() user: User,
    @Args('newCommentInput')
    newCommentInput: NewCommentInput,
  ): Promise<Comment> {
    if (this.userService.findOne(user.username)!) {
      throw new NotFoundException('Username may not exist or password incorrect');
    }
    const postCommented = await this.postsService.addComment(newCommentInput);
    return postCommented;
  }

  @Mutation(() => Answer)
  @UseGuards(GqlAuthGuard)
  async newAnswer(
    @CurrentUser() user: User,
    @Args('newAnswerInput')
    newAnswerInput: NewAnswerInput,
  ): Promise<Answer> {
    if (this.userService.findOne(user.username)!) {
      throw new NotFoundException('Username may not exist or password incorrect');
    }
    const Resp = await this.postsService.addAnswer(newAnswerInput);
    return Resp;
  }
}
