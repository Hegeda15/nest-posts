import CustomButton from "./custom-button"
import { useSignUp } from "../logic/useUsers"

function LoginForm() {
    const {mutate,isPending} = useSignUp()
    const handleSubmit = async (formdata: any) => {
        'use server'
        const email = formdata.get('email')
        const name = formdata.get('name')
        const password = formdata.get('password')

        const user ={ email, name, password }

        await mutate(user)
    }
    return (
        <div className=" min-w-1/4" >
            <form action={handleSubmit} className="flex flex-col gap-4 p-4">
                <input type="email" disabled={isPending} name="email" className="border-2 border-amber-700 h-12 rounded-lg" placeholder="Email..." />
                <input type="text" name="name" className="border-2 border-amber-700 h-12 rounded-lg" placeholder="Név..." />
                <input type="password" name="password" className="border-2 border-amber-700 h-12 rounded-lg" placeholder="Jelszó..." />
                <CustomButton ispending={isPending} type="submit" variant="secondary" className="cursor-pointer">      {isPending ? "Submitting..." : "Submit"}</CustomButton>
            </form>
        </div>
    )
}

export default LoginForm