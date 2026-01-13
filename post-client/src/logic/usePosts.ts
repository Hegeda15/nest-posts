import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPost, deleteOwnPost, editOwnPost, GetAllPost, GetLikedPostById, GetOwnPosts, LikePost, RemoveLike } from "../api/post";
import { useInvalidateQueries } from "../hooks/queryclient";
import { useNavigate } from "react-router-dom";
import type { Post } from "../schemas/types/type";




export const useGetAllPost = () => {
    return useQuery<Post[]>({
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
export const useGetOwnPosts = () => {
    return useQuery<Post[]>({
        queryKey: ['ownPosts'],
        queryFn: GetOwnPosts,

    })
}
export const useLikePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ postId }: { postId: number }) => LikePost({ postId }),

        // Optimista update: azonnal változik a UI
        onMutate: async ({ postId }) => {
            await queryClient.cancelQueries({ queryKey: ["posts"] });

            const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);

            queryClient.setQueryData<Post[]>(["posts"], (old = []) =>
                old.map(p =>
                    p.postId === postId
                        ? {
                            ...p,
                            likesCount: p.likesCount
                                ? p.userReaction === "like"
                                    ? p.likesCount - 1
                                    : p.likesCount + 1
                                : 1,
                            userReaction: p.userReaction === "like" ? null : "like",
                        }
                        : p
                )
            );

            return { previousPosts };
        },

        // On success: frissítjük a cache-t a backendből visszakapott értékekkel
        onSuccess: (data, variables) => {
            queryClient.setQueryData<Post[]>(["posts"], old =>
                old?.map(p =>
                    p.postId === variables.postId
                        ? {
                            ...p,
                            likesCount: data.likesCount ?? p.likesCount,
                            userReaction: data.userReaction,
                        }
                        : p
                )
            );
        },

        onError: (error: any, variables, context) => {
            // rollback ha kell
            if (context?.previousPosts) {
                queryClient.setQueryData(["posts"], context.previousPosts);
            }
            const message = error?.response?.data?.message ?? error.message;
            console.error("Error liking post:", message);
        },
    });
};

export const useRemoveLike = (onRemoveLike?: () => void) => {
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
    const { invalidateQueries } = useInvalidateQueries();
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
    const navigate = useNavigate()
    const { invalidateQueries } = useInvalidateQueries();

    return useMutation({
        mutationFn: async ({ postId, title, content }: { postId: number; title: string; content: string }) =>
            editOwnPost(postId, { title, content }),
        onSuccess: () => {
            invalidateQueries(['ownPosts']);
            setTimeout(() => navigate('/ownposts'), 2000);
        }
    })
}


export const useCreatePost = () => {
    const { invalidateQueries } = useInvalidateQueries();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            invalidateQueries(['ownPosts']);
            setTimeout(() => navigate('/ownposts'), 2000);
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message ?? error.message;
            console.error("Error creating post:", message);
        }
    })
}
