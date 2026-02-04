import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from './posts/posts.module';
import { LikesController } from './likes/likes.controller';
import { LikesModule } from './likes/likes.module';
import { CommentsModule } from './comments/comments.module';
import { SavedPostsModule } from './saved-posts/saved-posts.module';
import { FriendsModule } from './friends/friends.module';
import { MessagesModule } from './messages/messages.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    UsersModule,
    AuthModule,
    PostsModule,
    LikesModule,
    CommentsModule,
    SavedPostsModule,
    FriendsModule,
    MessagesModule,
  ],
})
export class AppModule {}
