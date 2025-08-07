import axios from "axios";

export const GetAllPost = async () => {
    try {
        const res = await axios.get("http://localhost:3000/posts");
        return res.data;
    } catch (error) {
        console.error("Hiba a lekérés során:", error);
        throw error;
    }
};
export const LikePost = async ({ postId, userId, reaction }: {
    postId: number;
    userId: number;
    reaction: "like" | "dislike";
}) => {
    const token = localStorage.getItem("token");

    try {
        const res = await axios.post(`http://localhost:3000/likes/${postId}/react`, {
            userId,
            reaction,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",

            }
        });
        return res.data;
    } catch (error) {
        console.error("Hiba a like során:", error);
        throw error;
    }
}

export const RemoveLike = async ({
    postId,
    userId,
}: {
    postId: number;
    userId: number;
}) => {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `http://localhost:3000/likes/${postId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            data: {
                userId,
            },
        }
    );

    return response.data;
};