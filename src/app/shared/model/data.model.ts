import { InterfaceType, Field } from '@nestjs/graphql';

@InterfaceType()
export abstract class DataInterface {
  @Field(() => String)
  id!: string;

  @Field(() => String)
  createdAt!: Date;

  @Field(() => String)
  updatedAt!: Date;
}
