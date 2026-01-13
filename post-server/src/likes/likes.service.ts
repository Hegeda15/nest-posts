import { BadRequestException, Injectable } from '@nestjs/common';
import { db } from 'db';
import { postReactions, posts, users } from 'db/schema';
import { and, eq, sql } from 'drizzle-orm';
import e from 'express';
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

  async likeMethod(userId: number, postId: number) {
    const exist = await db
      .select()
      .from(postReactions)
      .where(
        and(
          eq(postReactions.userId, userId),
          eq(postReactions.postId, postId)
        )
      )
      .limit(1);

    let status: 'liked' | 'unliked';

    if (!exist.length) {
      await db.insert(postReactions).values({
        userId,
        postId,
        reactionType: 'like',
      });
      status = 'liked';
    } else if (exist[0].reactionType === 'like') {
      await db.delete(postReactions).where(
        and(
          eq(postReactions.userId, userId),
          eq(postReactions.postId, postId)
        )
      );
      status = 'unliked';
    } else {
      await db
        .update(postReactions)
        .set({ reactionType: 'like' })
        .where(
          and(
            eq(postReactions.userId, userId),
            eq(postReactions.postId, postId)
          )
        );
      status = 'liked';
    }

    // itt lekérjük a friss like countot
    const likesCount = await this.getLikeCount(postId);

    return {
      status,
      likesCount,          // friss like szám
      userReaction: status === 'liked' ? 'like' : null, // frontendre
    };
  }

  // getLikeCount maradhat így
  async getLikeCount(postId: number) {
    const res = await db
      .select({ count: sql<number>`count(*)` })
      .from(postReactions)
      .where(
        and(
          eq(postReactions.postId, postId),
          eq(postReactions.reactionType, 'like')
        )
      );
    return res[0].count;
  }

 
}


