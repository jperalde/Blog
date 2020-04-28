import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { UserModule } from './core/user/user.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [PostsModule, UserModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
