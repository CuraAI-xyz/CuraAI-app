import logo from "../assets/logo cura 1.png";
import { useContext } from "react";
import { UserContext } from "../userContext";
function DashboardMenu() {
  const { logout } = useContext(UserContext);
    const handleLogout = () => {
      logout();
    }
  return (
    <div className="bg-[#61A5C2] w-50 h-screen flex flex-col justify-between">
      <img src={logo} alt="" srcSet="" />
      <ul className="w-full text-center font-bold text-white font-rubik">
        <li className="hover:bg-[#4a87a1] py-4 cursor-pointer">Mis Pacientes</li>
      </ul>
      <button onClick={handleLogout} className='bg-white mb-6 flex mx-auto border font-rubik py-3 px-8 text-[#61A5C2] rounded-full cursor-pointer'>Logout</button>
    </div>
  );
}
export default DashboardMenu;