import { Injectable } from '@nestjs/common';
import { CommentsDto } from './dto';
import { db } from 'db';
import { commentsTable } from 'db/schema';
import { sql } from 'node_modules/drizzle-orm/sql/index.cjs';
import { eq } from 'drizzle-orm';
import { count } from 'drizzle-orm';


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

  async findAll(postId: number) {
    const res= await db.select().from(commentsTable);
    const commentCount = await this.getcommentCount(postId);
    return { comments: res, commentCount };
  }

  async getcommentCount(postId: number) {
  const res = await db
    .select({
      count: count(),
    })
    .from(commentsTable)
    .where(eq(commentsTable.postId, postId));

  return res[0].count;
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
