import axios from "axios"
const BASE_URL = "http://localhost:3000"
export async function getUserProfile() {
    const token = localStorage.getItem("token");

    if (!token) {
        console.warn("Nincs token a localStorage-ben!");
        throw new Error("Hiányzó token – bejelentkezés szükséges.");
    }

    try {
        const response = await axios.get(`${BASE_URL}/users/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error('Hiba a felhasználói profil lekérésekor:', error);
        throw error;
    }
}