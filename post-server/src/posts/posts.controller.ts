import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { PostDto } from './dto';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express/multer/interceptors/file.interceptor';
import CloudinaryStorage from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { ApiBody } from '@nestjs/swagger';
import { Inject } from '@nestjs/common'; import { v2 as Cloudinary } from 'cloudinary';
@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService,
    @Inject('CLOUDINARY') private cloudinary: typeof Cloudinary,) { }
  // @UseGuards(AuthGuard('jwt'))
  @Get()
  getPosts() {
    return this.postService.getPosts();
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('ownpost')
  getOwnPost(@Req() req: Request) {
    const user = req.user as any;
    const userId = user.sub;

    return this.postService.getOwnPost(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post()

  @UseInterceptors(
    FileInterceptor('image'))
  async createPost(@Body() dto: PostDto, @UploadedFile() file: Express.Multer.File, @Req() req: Request) {
    const user = req.user as any; // vagy típusosítani, ha van saját interface-ed
    const userId = user.sub; // `sub`, nem `id`, ahogy a JWT payload-ban definiáltad
    // 🔍 DEBUG – ezt később kiveheted
    console.log({
      hasFile: !!file,
      hasBuffer: !!file?.buffer,
      bufferSize: file?.buffer?.length,
      mime: file?.mimetype,
    });
    console.log('Injected cloudinary:', this.cloudinary);
    if (file) {
      const uploadResult: any = await new Promise((resolve, reject) => {
        const stream = this.cloudinary.uploader.upload_stream({ folder: 'posts', resource_type: 'image', }, (error, result) => { if (error) return reject(error); resolve(result); },);

        Readable.from(file.buffer)
          .on('error', reject)
          .pipe(stream);
      });
      console.log('Cloudinary result:', uploadResult);

      dto.imageUrl = uploadResult.secure_url;
    }

    return this.postService.createUserPost(dto, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('ownpost/:id')
  async deletePost(@Param('id') id: string) {
    try {
      return await this.postService.deletePost(Number(id));
    } catch (error) {
      throw new HttpException('nincs ilyen poszt', HttpStatus.NOT_FOUND);
    }
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('ownpost/:id')
  async updateOwnPost(@Param('id') id: string, @Body() dto: PostDto) {
    try {
      const post = await this.postService.updatePost(Number(id), dto);
      return post;
    } catch (error) {
      throw new HttpException('nincs iylen id', HttpStatus.NOT_FOUND);
    }
  }

}
