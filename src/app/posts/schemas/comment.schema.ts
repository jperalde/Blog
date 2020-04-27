import * as mongoose from 'mongoose';
import { AnswerSchema } from './answer.schema';

export const CommentSchema = new mongoose.Schema({
  id: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  author: String,
  title: String,
  text: String,
  answers: [AnswerSchema],
});
