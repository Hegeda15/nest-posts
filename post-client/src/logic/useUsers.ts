import { useMutation } from "@tanstack/react-query";
import { SignUpUser } from "../api/auth";
import { useNavigate } from 'react-router-dom';
import type { SignUpData } from "../schemas/auth";
export const useSignUp = () => {
      const navigate = useNavigate(); 

    return useMutation({

        mutationFn: async (user: SignUpData) => SignUpUser(user),
        onSuccess: (data) => {
            console.log("User signed up successfully:", data);
            navigate('/login');
        },
        onError: (error) => {
            console.error("Error signing up user:", error);
        }
    })
}