import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsDto } from './dto';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';
import { Request } from 'express';


@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  @UseGuards(AuthGuard('jwt'))
  @HttpCode(HttpStatus.CREATED)
  @Post("/:postId")
  async create(@Body() createCommentDto: CommentsDto, @Req() req: Request, @Param('postId') postId: string) {

    try {
      const user = req.user as any;
      const userId = user.sub;

      return this.commentsService.createComment(createCommentDto, userId, Number(postId));
    } catch (error) {
      console.error('Hiba a hozzászólás létrehozásakor:', error);
      throw error;
    }


  }

  @Get("/:postId")
  findAll(@Param('postId') postId: string) {
    return this.commentsService.findAll(Number(postId));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCommentDto: CommentsDto) {
    return this.commentsService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(+id);
  }
}
