import { BadRequestException, Injectable } from '@nestjs/common';
import { db } from 'db';
import { postReactions, posts, userTable } from 'db/schema';
import { and, eq } from 'drizzle-orm';
import { users } from 'drizzle/schema';
import { existingPost } from 'src/utils';
@Injectable()
export class LikesService {
  async likedPost(
    userId: number,
    postId: number,
    reaction: 'like' | 'dislike',
  ) {
    const existing = await existingPost(postId);
    if (!existing) {
      throw new BadRequestException(
        `A megadott poszt (id: ${postId}) nem létezik.`,
      );
    }
    const [react] = await db.insert(postReactions).values({
      userId: userId,
      postId: postId,
      reactionType: reaction,
    });

    return {
      message: 'Reakció sikeresen hozzáadva!',
      result: react,
    };
  }
  async getLikedPost(id: number) {
    const loked = await db
      .select({
        userId: postReactions.userId,
        postId: postReactions.postId,
        reactionType: postReactions.reactionType,
        userName: users.name,
        content: posts.content,
        title: posts.title,
      })
      .from(postReactions)
      .innerJoin(posts, eq(postReactions.postId, posts.id))
      .innerJoin(users, eq(postReactions.userId, users.id))
      .where(and(eq(users.id, id), eq(postReactions.reactionType, 'like')));
    console.log(loked);
    return loked;
  }
  async getAllLikedPost(id: number) {
    const loked = await db
      .select({
        userId: postReactions.userId,
        postId: postReactions.postId,
        reactionType: postReactions.reactionType,
        userName: users.name,
        content: posts.content,
        title: posts.title,
      })
      .from(postReactions)
      .innerJoin(posts, eq(postReactions.postId, posts.id))
      .innerJoin(users, eq(postReactions.userId, users.id))
      .where(and(eq(users.id, id), eq(postReactions.reactionType, 'like')));
    console.log(loked);
    return loked;
  }
  async removeLikedPost(postId: number, userId: number) {
    const ex = await existingPost(postId);
    if (!ex) {
      throw new BadRequestException(
        `A megadott poszt (id: ${postId}) nem létezik.`,
      );
    }
  
    const deleted = await db
      .delete(postReactions)
      .where(
        and(
          eq(postReactions.postId, postId),
          eq(postReactions.userId, userId),
          eq(postReactions.reactionType, 'like')
        )
      );
  
    return {
      message: 'Reakció törölve.',
      result: deleted,
    };
  }
  
}
