import CuraLogo from '../assets/logosvg 1.svg';
import { useContext } from 'react';
import { UserContext } from '../userContext';
function Header() {
  const { logout } = useContext(UserContext);
  const handleLogout = () => {
    logout();
  }
  return (
    <header className="flex w-full mb-40 p-5 justify-between items-center text-[#61A5C2] font-bold">
        <div className='flex gap-4 items-center'>
        <img src={CuraLogo} alt="" width={50}/>
        <h1 className="text-2xl text-[#0D1B2A]">CuraAI</h1>
        </div>
        <div className='flex gap-4'>
        <a className="border py-3 px-4 rounded-full" href="/filesUpload">Scan my docs</a>
        <button onClick={handleLogout} className='bg-[#61A5C2] border py-3 px-4 text-white rounded-full cursor-pointer'>Logout</button>
        </div>
    </header>
  );
}

export default Header;