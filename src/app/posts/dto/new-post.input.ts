import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class NewPostInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(20)
  author?: string;

  @Field()
  @MaxLength(50)
  title!: string;

  @Field()
  @MaxLength(4000)
  text!: string;

  @Field(() => [String])
  categories!: string[];
}
