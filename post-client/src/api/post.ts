import axios from "axios";
import { get } from "react-hook-form";

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
export const GetLikedPostById = async (id: number) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`http://localhost:3000/likes/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",

        }
    }
    );
    return response.data;
};

export const GetOwnPosts = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get("http://localhost:3000/posts/ownpost", {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    });
    return response.data; {
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

export const deleteOwnPost = async (postId: number) => {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`http://localhost:3000/posts/ownpost/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    return response.data;
}
export const editOwnPost = async (postId: number, postData: { title: string; content: string }) => {
    const token = localStorage.getItem("token");

    const response = await axios.patch(`http://localhost:3000/posts/ownpost/${postId}`, postData, {
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });
    return response.data;
}
export const createPost = async (postData: { title: string; content: string }) => {
    const token= localStorage.getItem("token");
    const response = await axios.post("http://localhost:3000/posts", postData, {
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    })
    return response.data;
}