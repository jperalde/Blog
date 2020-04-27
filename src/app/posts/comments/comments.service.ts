import { Inject, Injectable } from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { Model } from 'mongoose';
import { CommentModel } from '../interfaces/comment.interface';
import { AnswerModel } from '../interfaces/answer.interface';
import { Answer } from '../answers/models/answer.model';
import { NewCommentInput } from './dto/new-comment.input';
import { Comment } from './models/comments.model';

@Injectable()
export class CommentsService {
  constructor(
    @Inject('CommentModel')
    private commentModel: Model<CommentModel>,
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

  async create(data: NewCommentInput): Promise<[Comment, CommentModel]> {
    const createdAt = new Date();
    const updatedAt = createdAt;
    const answers: AnswerModel[] = [];
    const id = new ObjectID().toString();
    const createdComment = new this.commentModel({ ...data, createdAt, updatedAt, answers, id });
    await createdComment.save();

    return [{ ...data, createdAt, updatedAt, answers, id }, createdComment];
  }

  async findAll(): Promise<Comment[]> {
    const comments = await this.commentModel
      .find()
      .sort([['createdAt', 'descending']])
      .exec();
    const arrayOfComments: Comment[] = comments.map(element => this.breakDownComment(element));

    return arrayOfComments as Comment[];
  }

  async findOneById(id: string): Promise<[Comment, CommentModel]> {
    const comments = await this.commentModel.find({ id }).exec();

    return [this.breakDownComment(comments[0]), comments[0]];
  }
}
