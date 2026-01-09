import { ForbiddenException, Injectable } from '@nestjs/common';
import { db } from 'db';
import { PostDto } from './dto';
import { eq } from 'drizzle-orm';
import { posts,postReactions, users } from 'db/schema';
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
        userName: users.name,
        imageUrl:posts.imageUrl // vagy username, attól függ, hogy hívják nálad
      })
      .from(posts)
      .leftJoin(users, eq(posts.userId, users.id))
      .where(eq(posts.userId, users.id));
    return postsWithUser;
  }

  async getOwnPost(id:number){
    const postsWithUser = await db
      .select({
        postId: posts.id,
        title: posts.title,
        content: posts.content,
        userId: posts.userId,
        userName: users.name, 
      })
      .from(posts)
      .leftJoin(users, eq(posts.userId, users.id))
      .where(eq(posts.userId,id ));

    return postsWithUser;
  }

  async createUserPost(dto: PostDto, userId: number) {
    const [post] = await db.insert(posts).values({
      title: dto.title,
      content: dto.content,
      userId: userId,
      imageUrl: dto.imageUrl,
    });
    
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
