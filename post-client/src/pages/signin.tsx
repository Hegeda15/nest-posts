import AuthForm from "../components/auth-form"

function SignIN() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-400">
        <h1 >Log In</h1>
        <AuthForm page="signup" />
    </div>
  )
}

export default SignIN