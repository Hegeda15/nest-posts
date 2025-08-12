import { useMutation, useQuery } from "@tanstack/react-query";
import { SignInUser, SignUpUser } from "../api/auth";
import { useNavigate } from 'react-router-dom';
import type { SignInData, SignUpData } from "../schemas/auth";
import { getUserProfile } from "../api/user";
import { fa } from "zod/v4/locales";
export const useSignUp = () => {
    const navigate = useNavigate();

    return useMutation({

        mutationFn: async (user: SignUpData) => SignUpUser(user),
        onSuccess: (data) => {
            console.log("User signed up successfully:", data);
            navigate('/login');
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message ?? error.message;

            console.error("Error signing up user:", message);
        }
    })
}

export const useSignIn = () => {
    const navigate = useNavigate();

    return useMutation({

        mutationFn: async (user: SignInData) => SignInUser(user),
        onSuccess: (data) => {
            console.log("Login success response:", data);
            localStorage.setItem("token", data.access_token);
            console.log("Token saved:", localStorage.getItem("token"));
            navigate('/home');
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message ?? error.message;
            console.error("Hiba a bejelentkezés során:", message);

        }
    })
}
export const logOut = () => {
    const navigate = useNavigate();

    localStorage.removeItem("token");
    navigate('/login');
}

export const useGetLoggedInUser = () => {
    return useQuery({
        queryKey: ['userProfile'],
        queryFn: getUserProfile,
        staleTime: 1000 * 60 * 5, // 5 minutes
        enabled: !!localStorage.getItem("token"), 
        refetchOnWindowFocus: false,
    })
}