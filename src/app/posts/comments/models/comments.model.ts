import { Field, ObjectType } from '@nestjs/graphql';
import { DataInterface } from '../../../shared/model/data.model';
import { Answer } from '../../answers/models/answer.model';

@ObjectType({ implements: DataInterface })
export class Comment implements DataInterface {
  id!: string;
  createdAt!: Date;
  updatedAt!: Date;

  @Field()
  title!: string;

  @Field()
  text!: string;

  @Field({ nullable: true })
  author?: string;

  @Field(() => [Answer], { nullable: 'items' })
  answers!: Answer[];
}
