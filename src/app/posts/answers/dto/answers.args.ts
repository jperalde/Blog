import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class AnswersArgs {
  @Field(() => Int, { nullable: true })
  @Min(0)
  skip? = 0;

  @Field(() => Int, { nullable: true })
  @Min(1)
  @Max(50)
  take? = 15;
}
