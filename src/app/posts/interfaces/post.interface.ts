import { Document } from 'mongoose';
import { CommentModel } from './comment.interface';

export interface PostModel extends Document {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly author: string;
  readonly title: string;
  readonly categories: [string];
  readonly comments: [CommentModel];
  readonly text: string;
}
