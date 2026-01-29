export interface Post {
  postId: number;
  title: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  likesCount: number;
  userReaction?: 'like' | null;
}
export type CommentsType={
  id: number;
  content: string;
  postId: number;
  userId: number;
  createdAt: string; 
 
}

export type CommentsResponse = {
  comments: CommentsType[];
  commentCount: number;
};
export type User={
  id: number;
  name: string;
  email: string;
}