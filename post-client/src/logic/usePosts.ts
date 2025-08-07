import { useMutation, useQuery } from "@tanstack/react-query";
import { GetAllPost, LikePost, RemoveLike } from "../api/post";
type CardData = {
    postId: number;
    title: string;
    content: string;
    userId: number;
    userName: string;
}

export const useGetAllPost = () => {
    return useQuery<CardData[]>({
        queryKey: ['posts'],
        queryFn: GetAllPost,
    });
}

export const useLikePost = (onLiked?: () => void) => {
    return useMutation({
        mutationFn: LikePost,

        onSuccess: (data) => {

            console.log("Post liked successfully:", data);
            onLiked?.();
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message ?? error.message;
            console.error("Error liking post:", message);
        }
    });

};

export const useRemoveLike = (onRemoveLike?:()=>void) => {
    return useMutation({
        mutationFn: RemoveLike,
        onSuccess: (data) => {
            console.log("Post like removed successfully:", data);
            onRemoveLike?.();
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message ?? error.message;
            console.error("Error liking post:", message);
        }
    })
}