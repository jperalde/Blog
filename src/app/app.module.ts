import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UserModule } from './core/user/user.module';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
  imports: [
    PostsModule,
    UserModule,
    GraphQLModule.forRoot({ autoSchemaFile: true, context: ({ req }) => ({ req }) }),
    MongooseModule.forRoot('mongodb://root:example@localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
