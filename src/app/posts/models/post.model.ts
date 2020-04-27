import { ObjectType, Field } from '@nestjs/graphql';
import { DataInterface } from '../../shared/model/data.model';
import { Comment } from '../comentarios/models/comments.model';

@ObjectType({ implements: DataInterface })
export class Post implements DataInterface {
  id!: string;
  createdAt!: Date;
  updatedAt!: Date;

  @Field({ nullable: true })
  author?: string;

  @Field()
  title!: string;

  @Field()
  text!: string;

  @Field(() => [String])
  categories!: string[];

  @Field(() => [Comment])
  comments!: Comment[];
}
