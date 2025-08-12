import { useQueryClient } from "@tanstack/react-query";


export const useInvalidateQueries = () => {
    const queryClient = useQueryClient();

    const invalidateQueries = (queryKey: string[]) => {
        queryClient.invalidateQueries({ queryKey });
    };

    return { invalidateQueries };
};
