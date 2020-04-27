import * as mongoose from 'mongoose';
import { CommentSchema } from './comment.schema';

export const PostSchema = new mongoose.Schema({
  id: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  author: String,
  title: String,
  categories: [String],
  comments: [CommentSchema],
  text: String,
});
