import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';
@InputType()
export class NewAnswerInput {
  @Field()
  idComment!: string;

  @Field()
  @MaxLength(1000)
  text!: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(2, 20)
  author?: string;
}
