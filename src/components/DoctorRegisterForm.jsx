import "../App.css";
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect, useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../userContext.jsx'

function DoctorLoginForm() {
    const url = import.meta.env.VITE_SUPABASE_URL
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    const { client, setClient, registerDoctor, register } = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [surname, setSurname] = useState("")
    const [calendlyURL, setCalendlyURL] = useState("")
    const [speciality, setSpeciality] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    let navigate = useNavigate();
    

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
        registerDoctor({name, surname, calendlyURL, mail: email, speciality})
        const role = "doctor"
        register({email, password, firstName: name, lastName: surname, role})
        navigate("/doctorLogin");
    }

    const nameChange = (e) => {
        setName(e.target.value)
    }
    const surnameChange = (e) => {
        setSurname(e.target.value)
    }
    const emailChange = (e) => {
        setEmail(e.target.value)
    }
    const passwordChange = (e) => {
        setPassword(e.target.value)
    }
    const calendlyChange = (e) => {
        setCalendlyURL(e.target.value)
    }
    const specialityChange = (e) => {
        setSpeciality(e.target.value)
    }

    const inputsList = [
        {"label":"Nombre", "value":name, "change":nameChange, "type":"text", "id":"name"},
        {"label":"Apellido", "value":surname, "change":surnameChange, "type":"text", "id":"surname"},
        {"label":"Mail", "value":email, "change":emailChange, "type":"email", "id":"email"},
        {"label":"Contraseña", "value":password, "change":passwordChange, "type":"password", "id":"password"},
        {"label": "Calendly URL", "value": calendlyURL, "change": calendlyChange, "type":"text", "id":"calendly"},
        {"label": "Especialidad", "value": speciality, "change": specialityChange, "type":"text", "id":"speciality"}
    ]

    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center text-[#1b2445] dark:text-white mb-6">Registro de Médico</h2>
            <form onSubmit={submit} action="#" className="space-y-6" method="POST">
                {inputsList.map((inputMed) => (
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="username">{inputMed.label}</label>
                    <div className="mt-1">
                        <input 
                            onChange={inputMed.change} 
                            value={inputMed.value}
                            className="block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900 dark:text-white" 
                            id={inputMed.label} 
                            name={inputMed.label} 
                            required 
                            type={inputMed.type} 
                        />
                    </div>
                </div>

                ))}
                <div>
                    <button className="w-full bg-[#61A5C2] flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#5a96b0] hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800 transition-colors duration-200" type="submit">
                        Registrarse
                    </button>
                </div>
            </form>
            <div className="mt-6 text-center">
                <p className="text-sm flex justify-center gap-1 text-gray-600 dark:text-gray-400">
                    Ya tenes cuenta?
                    <a className="font-medium text-[#61A5C2] hover:text-[#5a96b0]" href="/doctorLogin">
                        Inicia Sesión
                    </a>
                </p>
            </div>
        </div>
    );
}

export default DoctorLoginForm;