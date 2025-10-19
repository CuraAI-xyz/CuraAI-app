import CuraLogo from '../assets/logosvg 1.svg';
function Header() {
  return (
    <header className="flex w-full mb-40 p-5 justify-between items-center text-[#61A5C2] font-bold">
        <div className='flex gap-4 items-center'>
        <img src={CuraLogo} alt="" width={50}/>
        <h1 className="text-2xl text-[#0D1B2A]">CuraAI</h1>
        </div>
        <a className="border-1 p-3 rounded" href="/filesUpload">Scan my docs</a>
    </header>
  );
}

export default Header;