import LoginForm from "../components/LoginForm"
import bag from '../assets/doctor-bag.png'
function LoginPage() {
  return (
    <div className="bg-[#FCFCFD] w-full h-screen flex justify-center items-center flex-col">
        <LoginForm />
        <a href="/doctor" className="w-3/19 flex justify-around font-bold items-center py-3 px-2 mt-5 text-white rounded bg-[#5370dc] cursor-pointer lg:w-2/19"><img src={bag} alt="" width={30} />Soy Médico</a>
    </div>
  )
}

export default LoginPage