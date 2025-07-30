import { db } from 'db';
import { posts } from 'db/schema';
import { eq } from 'drizzle-orm';

export const existingPost = async (id: number) => {
  const res = await db.select().from(posts).where(eq(posts.id, id));

  return res.length > 0 ? res[0] : null;
};
