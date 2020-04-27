import { Inject, Injectable } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { Model } from 'mongoose';
import { CommentsService } from './comments/comments.service';
import { NewCommentInput } from './comments/dto/new-comment.input';
import { Comment } from './comments/models/comments.model';
import { NewPostInput } from './dto/new-post.input';
import { CommentModel } from './interfaces/comment.interface';
import { PostModel } from './interfaces/post.interface';
import { AnswerModel } from './interfaces/answer.interface';
import { Post } from './models/post.model';
import { NewAnswerInput } from './answers/dto/new-answer.input';
import { Answer } from './answers/models/answer.model';
import { AnswersService } from './answers/answers.service';

@Injectable()
export class PostsService {
  constructor(
    @Inject('PostModel')
    private postModel: Model<PostModel>,
    private readonly commentService: CommentsService,
    private readonly answerssService: AnswersService,
  ) {}

  breakDownAnswer(modelAnswer: AnswerModel): Answer {
    const id = modelAnswer.id;
    const author = modelAnswer.author;
    const updatedAt = modelAnswer.updatedAt;
    const text = modelAnswer.text;
    const createdAt = modelAnswer.createdAt;

    return { id, author, updatedAt, createdAt, text };
  }

  breakDownComment(modelComment: CommentModel): Comment {
    const id = modelComment.id;
    const author = modelComment.author;
    const title = modelComment.title;
    const updatedAt = modelComment.updatedAt;
    const text = modelComment.text;
    const createdAt = modelComment.createdAt;
    const answers: Answer[] = [];
    for (const answer of modelComment.answers) {
      answers.push(this.breakDownAnswer(answer));
    }

    return { answers, title, id, author, updatedAt, createdAt, text };
  }

  breakDownPost(modelPost: PostModel): Post {
    const id = modelPost.id;
    const author = modelPost.author;
    const title = modelPost.title;
    const categories = modelPost.categories;
    const updatedAt = modelPost.updatedAt;
    const text = modelPost.text;
    const createdAt = modelPost.createdAt;
    const comments: Comment[] = [];
    for (const comment of modelPost.comments) {
      comments.push(this.breakDownComment(comment));
    }

    return {
      comments,
      title,
      id,
      author,
      categories,
      updatedAt,
      createdAt,
      text,
    };
  }

  async create(data: NewPostInput): Promise<Post> {
    const createdAt = new Date();
    const updatedAt = createdAt;
    const comments: Comment[] = [];
    const id = new ObjectID().toString();
    const createdPost = new this.postModel({ ...data, createdAt, updatedAt, comments, id });
    await createdPost.save();
    return { ...data, createdAt, updatedAt, comments, id };
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postModel
      .find()
      .sort([['createdAt', 'descending']])
      .limit(5)
      .exec();
    const arrayOfPosts: Post[] = posts.map(element => this.breakDownPost(element));

    return arrayOfPosts as Post[];
  }

  async findOneById(id: string): Promise<[Post, PostModel]> {
    const posts = await this.postModel.find({ id }).exec();
    return [this.breakDownPost(posts[0]), posts[0]];
  }

  async findOneByTopic(topic: string): Promise<Post[]> {
    const posts = await this.postModel.find({ categories: topic }).exec();

    const arrayOfPost: Post[] = posts.map(element => this.breakDownPost(element));

    return arrayOfPost as Post[];
  }

  async addComment(newCommentInput: NewCommentInput): Promise<Comment> {
    const littleAnswer = await this.commentService.create(newCommentInput);
    const postit = await this.findOneById(newCommentInput.idPost);
    postit[1].comments.push(littleAnswer[1]);

    postit[1].save();
    return littleAnswer[0] as Comment;
  }

  async addAnswer(newAnswerInput: NewAnswerInput): Promise<Answer> {
    const littleAnswer = await this.answerssService.create(newAnswerInput);
    const comment = await this.commentService.findOneById(newAnswerInput.idComment);
    const post = await this.postModel.find({ 'comments.id': newAnswerInput.idComment });

    comment[1].answers.push(littleAnswer[1]);

    await post[0].updateOne({ comments: comment[1] });

    post[0].save;
    return littleAnswer[0] as Answer;
  }
}
