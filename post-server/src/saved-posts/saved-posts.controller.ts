import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Req, ParseIntPipe } from '@nestjs/common';
import { SavedPostsService } from './saved-posts.service';
import { CreateSavedPostDto } from './dto/create-saved-post.dto';
import { UpdateSavedPostDto } from './dto/update-saved-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ApiOkResponse } from '@nestjs/swagger';
import { Request } from 'express';


@ApiTags('Saved posts')
@UseGuards(AuthGuard('jwt'))
@Controller('saved-posts')
export class SavedPostsController {
  constructor(private readonly savedPostsService: SavedPostsService) { }


  @Post(':postId')
  @ApiOkResponse({ type: CreateSavedPostDto })
  async toggleSavedPost(
    @Param('postId', ParseIntPipe) postId: number,
    @Req() req: Request,
  ): Promise<CreateSavedPostDto> {
    const user = req.user as any;
    const userId = user.sub;

    return this.savedPostsService.addToSaved(userId, postId);
  }



  @Get()
  findAll(@Req() req: Request) {
    const user = req.user as any;
    const userId = user.sub;
    return this.savedPostsService.getAllSavedPosts(userId);
  }

}
