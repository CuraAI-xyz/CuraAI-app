import "../App.css";
function LoginForm() {  
    return (
        <div className="bg-white w-5/12 pt-4 pb-6 px-8 rounded-lg shadow-lg">
            <h2 className="font-rubi text-3xl font- text-center font-bold mb-4 text-[#61A5c2]">Login</h2>
            <form className="flex flex-col gap-4">
                <input className="p-2 rounded text-[#61A5C2] font-medium bg-white border-1 shadow-lg" type="text" placeholder="Username" />
                <input className="p-2 rounded text-[#61A5C2] font-medium bg-white border-1 shadow-lg" type="text" placeholder="Password" />
                <button className="text-white font-rubik cursor-pointer bg-[#61A5C2] font-bold py-2 px-4 rounded" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default LoginForm;