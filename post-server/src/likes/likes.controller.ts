import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('likes')
export class LikesController {
  constructor(private likesService: LikesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post(':postId')
  async likedPost(@Param('postId') postId: string, @Req() req ) {
    return this.likesService.likeMethod(req.user.sub, Number(postId));
  }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.OK)
  @Post(':id/react')
  async reactToPost(
    @Param('id') postId: string,
    @Req() req: Request,
    @Body() body: { reaction?: 'like' | 'dislike' },
  ) {
    console.log('BODY:', body);


    const user = req.user as any;
    const userId = user.sub;
    if (!body?.reaction) {
        throw new BadRequestException('A reakció mező kötelező (like/dislike)');
      }
    
      const result = await this.likesService.likedPost(
        userId,
        Number(postId),
        body.reaction,
      );
    
      return result;
  }
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getLikedPost(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as any;
    return await this.likesService.getLikedPost(Number(id));
  }
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllLiked(@Req() req: Request){
    const user = req.user as any;
    const userId = user.sub;
    console.log(userId)
    return await this.likesService.getAllLikedPost(userId)
  }
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async DeleteLikedPost(@Param('id') postId:string,@Req() req: Request){
    const user = req.user as any;
    const userId = user.sub;
    return await this.likesService.removeLikedPost(Number(postId),userId)
  }
}
