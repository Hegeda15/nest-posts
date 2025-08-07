import { useForm, type FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "./custom-button";
import { useSignIn, useSignUp } from "../logic/useUsers";
import { SignUpSchema, SignInSchema, type SignInData, type SignUpData } from "../schemas/auth";

interface AuthFormProps {
    page: "login" | "signup";
}

const AuthForm = ({ page }: AuthFormProps) => {
    const isSignup = page === "signup";

    const { mutate: signUp, isPending: isSignUpPending,error:signUpError,isError:signUpIsError } = useSignUp();
    const { mutate: signIn, isPending: isSignInPending, error, isError } = useSignIn();

    const isPending = isSignup ? isSignUpPending : isSignInPending;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpData | SignInData>({
        resolver: zodResolver(isSignup ? SignUpSchema : SignInSchema),
    });
    const formErrors = errors as FieldErrors<Partial<SignUpData>>;

    const onSubmit = (data: SignUpData | SignInData) => {
        if (isSignup) {
            signUp(data as SignUpData);
        } else {
            signIn(data as SignInData);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 p-4 min-w-[300px]">
            <input
                type="email"
                {...register("email")}
                disabled={isPending}
                placeholder="Email..."
                className="border-2 border-amber-700 h-12 rounded-lg px-2"
            />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            {isSignup && (
                <>
                    <input
                        type="text"
                        {...register("name")}
                        disabled={isPending}
                        placeholder="Név..."
                        className="border-2 border-amber-700 h-12 rounded-lg px-2"
                    />
                    {formErrors.name && (
                        <span className="text-red-500 text-sm">{formErrors.name.message}</span>
                    )}
                </>
            )}




            <input
                type="password"
                {...register("password")}
                disabled={isPending}
                placeholder="Jelszó..."
                className="border-2 border-amber-700 h-12 rounded-lg px-2"
            />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

            <CustomButton
                ispending={isPending}
                type="submit"
                variant="secondary"
                className="cursor-pointer"
            >
                {isPending ? "Küldés..." : "Beküldés"}
            </CustomButton>
            
            {isError && (
                <span className="text-red-500 text-sm">
                     Hiba a regisztráció során:  {error?.response?.data?.message ?? "Ismeretlen hiba történt."}
                </span>
            )}
             {signUpIsError && (
                <span className="text-red-500 text-sm">
                     Hiba a regisztráció során:  {signUpError?.response?.data?.message ?? "Ismeretlen hiba történt."}
                </span>
            )}
        </form>
    );
};

export default AuthForm;
