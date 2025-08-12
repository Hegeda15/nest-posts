import { useDeleteOwnPost } from "../logic/usePosts";

type CardData = {
    postId: number;
    title: string;
    content: string;
    userId: number;
    userName: string;
}
function OwnPostCard({ postId, title, content, userName, userId }: CardData) {
    const { mutate: deleteOwnPost } = useDeleteOwnPost()


    return (
        <div className="flex flex-col justify-center items-center bg-white shadow-md rounded-lg p-6 text-xl">
            <h2 className="text-xl font-bold mb-2 text-cyan-900">Cim: {title}</h2>
            <p className="text-gray-700">Tartalom:{content}</p>
            <p className="text-gray-700">Létrehozó: {userName}</p>
            <p className="text-gray-500 text-sm">Post ID: {postId}</p>
            <p className="text-gray-500 text-sm">User ID: {userId}</p>

            <div className="flex justify-center w-full mt-4 ">
                <button onClick={() => deleteOwnPost(postId)} className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-red-600">
                    Delete Post
                </button>
                <button className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600 ml-2">
                    Edit Post
                </button>
            </div>
        </div>
    )
}

export default OwnPostCard