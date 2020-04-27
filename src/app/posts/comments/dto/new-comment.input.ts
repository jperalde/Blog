import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class NewCommentInput {
  @Field()
  idPost!: string;

  @Field()
  @MaxLength(30)
  title!: string;

  @Field()
  @MaxLength(300)
  text!: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(20)
  author?: string;
}
