import { Injectable, Inject } from '@nestjs/common';
import { NewAnswerInput } from './dto/new-answer.input';
import { Answer } from './models/answer.model';
import { ObjectID } from 'mongodb';
import { AnswerModel } from '../interfaces/answer.interface';
import { Model } from 'mongoose';

@Injectable()
export class AnswersService {
  constructor(@Inject('AnswerModel') private answerModel: Model<AnswerModel>) {}

  breakDownAnswer(modelAnswer: AnswerModel): Answer {
    const id = modelAnswer.id;
    const author = modelAnswer.author;
    const updatedAt = modelAnswer.updatedAt;
    const text = modelAnswer.text;
    const createdAt = modelAnswer.createdAt;

    return { id, author, updatedAt, createdAt, text };
  }

  async create(data: NewAnswerInput): Promise<[Answer, AnswerModel]> {
    const createdAt = new Date();
    const updatedAt = createdAt;
    const id = new ObjectID().toString();
    const createdAnswer = new this.answerModel({ ...data, createdAt, updatedAt, id });
    await createdAnswer.save();
    return [{ ...data, createdAt, updatedAt, id }, createdAnswer];
  }

  async findAll(): Promise<Answer[]> {
    const answers = await this.answerModel
      .find()
      .sort([['createdAt', 'descending']])
      .exec();

    const arrayOfAnswer: Answer[] = answers.map(element => this.breakDownAnswer(element));

    return arrayOfAnswer as Answer[];
  }
}
