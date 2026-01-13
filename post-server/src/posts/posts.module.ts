import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { CloudinaryModule } from './cloudinary.module';
import { like } from 'drizzle-orm';
import { LikesService } from 'src/likes/likes.service';
@Module({
  imports: [
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
    CloudinaryModule,
  ],
  providers: [PostsService,LikesService],
  controllers: [PostsController]
})
export class PostsModule { }
