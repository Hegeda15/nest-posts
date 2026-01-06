import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import { CloudinaryModule } from './cloudinary.module';
@Module({
  imports: [
    MulterModule.register({
      storage: multer.memoryStorage(),
    }),
    CloudinaryModule,
  ],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule { }
