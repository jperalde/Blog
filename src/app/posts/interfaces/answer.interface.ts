import { Document } from 'mongoose';

export interface AnswerModel extends Document {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly author: string;
  readonly text: string;
}
