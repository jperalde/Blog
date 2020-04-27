import { Document } from 'mongoose';
import { AnswerModel } from './answer.interface';

export interface CommentModel extends Document {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly author: string;
  readonly title: string;
  readonly text: string;
  readonly answers: [AnswerModel];
}
