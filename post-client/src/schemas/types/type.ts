export interface Post {
  postId: number;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  likesCount: number;
}

export type User={
  id: number;
  name: string;
  email: string;
}