import { DataInterface } from '../../../shared/model/data.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType({ implements: DataInterface })
export class Answer implements DataInterface {
  id!: string;
  createdAt!: Date;
  updatedAt!: Date;

  @Field({ nullable: true })
  author?: string;

  @Field()
  text!: string;
}
