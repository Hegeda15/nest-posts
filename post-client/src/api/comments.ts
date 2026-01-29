import axios from "axios";
import type { CommentsResponse, CommentsType } from "../schemas/types/type";


export const GetComments = async (postId: number) => {
    const token = localStorage.getItem("token");
    try {
        const response = await axios.get<CommentsResponse>(`http://localhost:3000/comments/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error("Hiba a lekérés során:", error);
        throw error;
    }

}