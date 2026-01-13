import { Injectable } from '@nestjs/common';
import { CommentsDto } from './dto';
import { db } from 'db';
import { commentsTable } from 'db/schema';


@Injectable()
export class CommentsService {
 async createComment(createCommentDto: CommentsDto, userId: number, postId: number) {
    const [data] = await db.insert(commentsTable).values({
      content: createCommentDto.content,
      userId: userId,
      postId: postId,
    });
    return { message: 'Hozzászólás sikeresen létrehozva', comment: data };
  }

  findAll() {
    return `This action returns all comments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: CommentsDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
