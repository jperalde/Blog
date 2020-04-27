import * as mongoose from 'mongoose';

export const AnswerSchema = new mongoose.Schema({
  id: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  author: String,
  text: String,
});
