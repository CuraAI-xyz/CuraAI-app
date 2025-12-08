import LoginForm from "../components/LoginForm"
import logoCura from '../assets/logo cura 1.png'
function LoginPage() {
  return (
    <div className="bg-[#F9FAFB] w-full h-screen flex justify-center items-center flex-col">
      <h1 className="text-6xl font-rubik font-bold mb-5 text-[#1b2445]">CuraAI</h1>
        <LoginForm />
    </div>
  )
}

export default LoginPage