import { Injectable } from '@nestjs/common';
import { CreateSavedPostDto } from './dto/create-saved-post.dto';
import { UpdateSavedPostDto } from './dto/update-saved-post.dto';
import { db } from 'db';
import { posts, savedPostsTable } from 'db/schema';
import { and, eq, sql } from 'drizzle-orm';
import { basePostQuery } from 'src/utils';

@Injectable()
export class SavedPostsService {
  async findSavedState() {
    const res = await db.select({ issaved: savedPostsTable.isSaved }).from(savedPostsTable);
    if (res.find((item) => item.issaved === 1)) {
      return true;
    }
    return false;
  }

  async addToSaved(userId: number, postId: number) {
    try {
      await db.insert(savedPostsTable).values({ userId, postId });
      return { saved: true };
    } catch {
      await db.delete(savedPostsTable).where(
        and(
          eq(savedPostsTable.userId, userId),
          eq(savedPostsTable.postId, postId),
        )
      );
      return { saved: false };
    }
  }

  async getAllSavedPosts(userId: number) {
    const savedPosts = await db
      .select()
      .from(savedPostsTable)
      .where(eq(savedPostsTable.userId, userId));

   
    const postsWithDetails = await basePostQuery(userId)
      .where(sql`${posts.id} IN (${savedPosts.map(p => p.postId)})`);

    return postsWithDetails;
  }

 
}
