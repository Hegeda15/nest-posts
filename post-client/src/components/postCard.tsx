import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useLikePost } from "../logic/usePosts";

type CardData = {
    postId: number;
    title: string;
    content: string;
    userId: number;
    userName: string;
}

function PostCard({ postId, title, content, userName, userId }: CardData) {
    const [liked, setLiked] = useState(false);

    const { mutate: likePost } = useLikePost(() => setLiked(true));

    const { mutate: removeLike } = useLikePost(() => setLiked(false));
    const handleLike = () => {
        likePost({
            postId,
            userId,
            reaction: "like"
        });
    };
    /*
        nem mukodik a dislike
        egy többsoros komment
    */
    const handleDislike = () => {
        removeLike({
            postId,
            userId,
            reaction: "dislike"
        });
    }


    return (
        <div className="flex flex-col justify-center items-center bg-white shadow-md rounded-lg p-6 text-xl">
            <h2 className="text-xl font-bold mb-2 text-cyan-900">Cim: {title}</h2>
            <p className="text-gray-700">Tartalom:{content}</p>
            <p className="text-gray-700">Létrehozó: {userName}</p>
            <p className="text-gray-500 text-sm">Post ID: {postId}</p>
            <p className="text-gray-500 text-sm">User ID: {userId}</p>

            <div onClick={liked ? handleDislike : handleLike} className="cursor-pointer">
                {liked ? (
                    <FaHeart className="text-red-600 text-3xl" />
                ) : (
                    <FaRegHeart className="text-gray-400 text-3xl" />
                )}
            </div>

        </div>
    )
}

export default PostCard