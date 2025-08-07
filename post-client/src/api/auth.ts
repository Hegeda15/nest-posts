import axios from "axios"
import type { SignInData, SignUpData } from "../schemas/auth";
const BASE_URL = "http://localhost:3000"

export async function SignUpUser(data: SignUpData) {

    try {
        const response = await axios.post(`${BASE_URL}/auth/signup`, data)
        return response.data;
    } catch (error) {
        console.error('Hiba a regisztrációnál:', error);
        throw error;
    }
}
export async function SignInUser(data: SignInData) {

    try {
        const response = await axios.post(`${BASE_URL}/auth/signin`, data)
        return response.data;
    } catch (error) {
        console.error('Hiba a regisztrációnál:', error);
        throw error;
    }
}