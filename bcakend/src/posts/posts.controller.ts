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
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';
import { PostDto } from './dto';
import { Request } from 'express';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}
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
  createPost(@Body() dto: PostDto, @Req() req: Request) {
    const user = req.user as any; // vagy típusosítani, ha van saját interface-ed
    const userId = user.sub; // `sub`, nem `id`, ahogy a JWT payload-ban definiáltad
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
