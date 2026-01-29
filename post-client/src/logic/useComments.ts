import { useQuery } from "@tanstack/react-query"
import { GetComments } from "../api/comments"
import type { CommentsResponse, CommentsType } from "../schemas/types/type"

export const useAddComment=()=>{

}

export const useGetComments = (postId: number) => {
  return useQuery<CommentsResponse>({
    queryKey: ['comments', postId],
    queryFn: () => GetComments(postId),
    enabled: !!postId,
  });
};