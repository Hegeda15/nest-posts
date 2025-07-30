import { ForbiddenException, Injectable } from '@nestjs/common';
import { db } from 'db';
import { posts, users } from 'drizzle/schema';
import { PostDto } from './dto';
import { eq } from 'drizzle-orm';
import { postReactions, userTable } from 'db/schema';
import { error } from 'console';

@Injectable()
export class PostsService {
  async getPosts() {
    const postsWithUser = await db
      .select({
        postId: posts.id,
        title: posts.title,
        content: posts.content,
        userId: posts.userId,
        userName: userTable.name, // vagy username, attól függ, hogy hívják nálad
      })
      .from(posts)
      .leftJoin(userTable, eq(posts.userId, userTable.id))
      .where(eq(posts.userId, userTable.id));

    return postsWithUser;
  }

  async getOwnPost(id:number){
    const postsWithUser = await db
      .select({
        postId: posts.id,
        title: posts.title,
        content: posts.content,
        userId: posts.userId,
        userName: userTable.name, // vagy username, attól függ, hogy hívják nálad
      })
      .from(posts)
      .leftJoin(userTable, eq(posts.userId, userTable.id))
      .where(eq(posts.userId,id ));

    return postsWithUser;
  }

  async createUserPost(dto: PostDto, userId: number) {
    const [post] = await db.insert(posts).values({
      title: dto.title,
      content: dto.content,
      userId: userId,
    });
    console.log(post);
    return { message: 'poszt sikeresen létrehozva', post: post };
  }
  async deletePost(id: number){
    const [post]= await db.delete(posts).where(eq(posts.id,id))
    if (!post.affectedRows) {
        throw new Error("nincs ilyen post")
    }
    return {message:"poszt sikeresen törölve",post:post}
  }

  async updatePost(id:number ,dto:PostDto){
    const [post] = await db.update(posts).set({
        title:dto.title,
        content:dto.content
    }).where(eq(posts.id,id))
    if (!post.affectedRows) {
        throw new Error("nincs ilyen post")
    }
    return {message:"poszt sikeresen frissítve",post:post}
  }

 
}
