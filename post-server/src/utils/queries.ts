import { db } from 'db';
import { posts ,users, postReactions, commentsTable } from 'db/schema';
import { eq,sql } from 'drizzle-orm';

export const existingPost = async (id: number) => {
  const res = await db.select().from(posts).where(eq(posts.id, id));

  return res.length > 0 ? res[0] : null;
};

export function basePostQuery(userId: number) {
  return db
    .select({
      postId: posts.id,
      title: posts.title,
      content: posts.content,
      userId: posts.userId,
      userName: users.name,
      imageUrl: posts.imageUrl,
      likesCount: sql<number>`(
        SELECT count(*) 
        FROM ${postReactions} pr 
        WHERE pr.post_id = ${posts.id}
        AND pr.reaction_type = 'like'
      )`,
      commentsCount: sql<number>`(
        SELECT count(*)
        FROM ${commentsTable} c
        WHERE c.post_id = ${posts.id}
      )`,
      userReaction: sql<string | null>`(
        SELECT pr.reaction_type
        FROM ${postReactions} pr
        WHERE pr.post_id = ${posts.id}
        AND pr.user_id = ${userId}
        LIMIT 1
      )`,
    })
    .from(posts)
    .leftJoin(users, eq(posts.userId, users.id));
}
