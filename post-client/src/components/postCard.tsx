import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useGetAllPost, useLikePost, useRemoveLike } from "../logic/usePosts";
import type { Post } from "../schemas/types/type";
import { useGetLoggedInUser } from "../logic/useUsers";
import { FaRegComment } from "react-icons/fa";
import { TbShare3 } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa";
import { useGetComments } from "../logic/useComments";


function PostCard() {
    const { data: posts, isLoading, error } = useGetAllPost();
    const { data: user } = useGetLoggedInUser();
    const likeMutation = useLikePost();
const { data: comments } = useGetComments(posts ? posts[0].postId : 0);
    if (isLoading) return <p>Betöltés...</p>;
    if (error) return <p>Hiba történt</p>;

    return (
        <div className="max-w-screen md:max-w-2xl md:mx-auto space-y-4">
            {posts?.map((post) => (
                
                <div key={post.postId} className="border mt-7  rounded p-4">
                    <div>
                        <div className="flex gap-4">
                            <span>Profilkep</span>
                            <h1>{user?.name}</h1>
                        </div>



                    </div>


                    {post.imageUrl && (
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="mt-3  rounded  md:max-h-[20rem]"
                        />

                    )}
                    <div className="flex gap-4 mt-4  cursor-pointer items-center">
                        <div className="flex items-center gap-1">
                            <FaHeart onClick={() => {
                                
                                likeMutation.mutate({ postId: post.postId });
                            }} className={post.userReaction=="like"?"text-red-600 text-lg":"text-lg "}/>
                                <span  className="text-sm">{post.likesCount}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaRegComment className="text-lg" />
                          
                            <span className="text-sm">{comments?.commentCount}</span>
                        </div>

                        <TbShare3 className="text-lg"/>
                        <FaRegBookmark className="text-lg"/>
                    </div>
                    <div className="flex gap-2 mt-2">
                        <p className=" font-medium">{user?.name} : </p>
                        <span>{post.content}</span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PostCard