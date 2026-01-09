import "../App.css";
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../userContext.jsx'
import SignIn from "../utils/authSignIn.js";
function LoginForm() {
    const url = import.meta.env.VITE_SUPABASE_URL
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    const { client, setClient, setUser, setUserId, userId } = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    useEffect(() => {
        if (url && anonKey && !client) {
            setClient(createClient(url, anonKey))
        }
    }, [url, anonKey, client, setClient])


  const submit = async (e) => {
        e.preventDefault()
        
        if (!client) {
            alert("Cliente de Supabase no está inicializado")
            return
        }

        const authData= await SignIn(client, email, password)
        if(authData){
            if(authData.user.user_metadata == "patient"){
                setUser(authData.user)
                setUserId(authData.user.id)
                try {
                let { data , error } = await client
                    .from('UsersData')
                    .select('*')
                    .eq('user_id', authData.user.id).single()
                if (error) {
                    console.error("Error fetching user data:", error);
                }
                console.log("DATA: ", data)
                await fetch("http://localhost:8080/userId", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        userId: data.user_id, 
                        name: data.nombre ,
                        surname: data.apellido,
                        sex: data.sexo
                    }), 
                })
            }  catch (e) {
                console.error("Error sending userId to server:", e);
            }
            }
        }else{
            console.log("El doctor no se puede registrar como paciente")
        }
    }

    const emailChange = (e) => {
        setEmail(e.target.value)
    }
    const passwordChange = (e) => {
        setPassword(e.target.value)
    }

    return (
        <div className="w-full font-rubik max-w-md bg-[#80c6e4] rounded-2xl shadow-xl p-8">
            <h1 className="text-6xl text-center font-rubik font-bold mb-5 text-[#1b2445]">CuraAI</h1>
            <h2 className="text-xl font-bold text-center text-[#1b2445] mb-6 font-rubik">Inicia Sesión</h2>
            <form onSubmit={submit} action="#" className="space-y-6" method="POST">
                <div>
                    <label className="block text-sm font-medium text-gray-700 " htmlFor="username">Correo Electronico</label>
                    <div className="mt-1">
                        <input 
                            onChange={emailChange} 
                            value={email}
                            className="block w-full px-3 py-2 bg-gray-50 rounded-md shadow-sm sm:text-sm text-gray-900" 
                            id="username" 
                            name="email" 
                            required 
                            type="email" 
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="password">Contraseña</label>
                    <div className="mt-1">
                        <input 
                            onChange={passwordChange} 
                            value={password}
                            className="block w-full px-3 py-2 bg-gray-50 rounded-md shadow-sm sm:text-sm text-gray-900" 
                            id="password" 
                            name="password" 
                            required 
                            type="password" 
                        />
                    </div>
                </div>
                <div className="text-right">
                    <a className="text-sm font-medium text-primary" href="#">
                        Olvidaste tu contraseña?
                    </a>
                </div>
                <div>
                    <button className="w-full bg-[#13485f] flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#5a96b0] hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800 transition-colors duration-200" type="submit">
                        Ingresar
                    </button>
                </div>
            </form>
            <div className="mt-6 text-center">
                <p className="text-sm flex justify-center gap-1 text-primary">
                    Aún no tenes cuenta?
                    <a className="font-medium text-[#61A5C2] hover:text-[#5a96b0]" href="/registerpage">
                        Registrate
                    </a>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;