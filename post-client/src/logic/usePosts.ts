import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteOwnPost, editOwnPost, GetAllPost, GetLikedPostById, GetOwnPosts, LikePost, RemoveLike } from "../api/post";
import { useInvalidateQueries } from "../hooks/queryclient";
import { useNavigate } from "react-router-dom";
import { set } from "zod";

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
export const useGetLikedPostById = (id: number) => {
    return useQuery({
        queryKey: ['likedPost', id],
        queryFn: () => GetLikedPostById(id),
        enabled: !!id, 
    })
}
export const useGetOwnPosts=()=>{
    return useQuery<CardData[]>({
        queryKey: ['ownPosts'],
        queryFn: GetOwnPosts,
        
    })
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
export const useDeleteOwnPost = () => {
     const {invalidateQueries} = useInvalidateQueries();
    return useMutation({
        mutationFn: deleteOwnPost,
        onSuccess: () => {
             invalidateQueries(['ownPosts']);
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message ?? error.message;
            console.error("Error deleting post:", message);
        },
    
    });
}
export const useEditOwnPost = () => {
    const navigate = useNavigate();
    const {invalidateQueries} = useInvalidateQueries();
    return useMutation({
         mutationFn: async ({ postId, title, content }: { postId: number; title: string; content: string }) => 
            editOwnPost(postId, { title, content }),
        onSuccess:()=>{
            invalidateQueries(['ownPosts']);
            setTimeout(() =>navigate('/ownposts'), 2000);
            
        }
    })
}
