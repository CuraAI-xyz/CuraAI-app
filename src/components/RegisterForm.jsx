import "../App.css";
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../userContext.jsx'

function RegisterForm() {
    const url = import.meta.env.VITE_SUPABASE_URL
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
    const { client, setClient, setUser, setUserId, register } = useContext(UserContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [passwordError, setPasswordError] = useState(false)

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
        if (password !== confirmPassword) {
            setPasswordError(true)
            return
        }
        register({email, password, firstName, lastName})
    }


    const emailChange = (e) => {
        setEmail(e.target.value)
    }
    const passwordChange = (e) => {
        setPassword(e.target.value)
    }
    const firstNameChange = (e) => {
        setFirstName(e.target.value)
    }
    const lastNameChange = (e) => {
        setLastName(e.target.value)
    }
    const confirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
    }

    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
            <h2 className="text-2xl font-bold text-center text-[#1b2445] dark:text-white mb-6">Register to CuraAI</h2>
            <form onSubmit={submit} action="#" className="space-y-6" method="POST">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="firstName">First Name</label>
                    <div className="mt-1">
                        <input 
                            onChange={firstNameChange} 
                            value={firstName}
                            className="block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900 dark:text-white" 
                            id="firstName" 
                            name="name" 
                            required 
                            type="text" 
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="lastName">Last Name</label>
                    <div className="mt-1">
                        <input 
                            onChange={lastNameChange} 
                            value={lastName}
                            className="block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900 dark:text-white" 
                            id="lastName" 
                            name="name" 
                            required 
                            type="text" 
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="username">Email</label>
                    <div className="mt-1">
                        <input 
                            onChange={emailChange} 
                            value={email}
                            className="block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900 dark:text-white" 
                            id="email" 
                            name="email" 
                            required 
                            type="email" 
                        />
                    </div>
                </div>
                <div>
                    <div className="w-full flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">Password</label>
                    {passwordError && <p className="text-red-500 text-sm mb-2 text-end">Passwords do not match</p>}
                    </div>
                    <div className="mt-1">
                        <input 
                            onChange={passwordChange} 
                            value={password}
                            className={`block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900 dark:text-white ${passwordError ? 'border-red-500' : ''}`} 
                            id="password" 
                            name="password" 
                            required 
                            type="password" 
                        />
                    </div>
                </div>
                <div>
                    <div className="w-full flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">Confirm Password</label>
                    {passwordError && <p className="text-red-500 text-sm mb-2 text-end">Passwords do not match</p>}
                    </div>
                    <div className="mt-1">
                        <input 
                            onChange={confirmPasswordChange} 
                            value={confirmPassword}
                            className={`block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-gray-900 dark:text-white ${passwordError ? 'border-red-500' : ''}`} 
                            id="password" 
                            name="password" 
                            required 
                            type="password" 
                        />
                    </div>
                </div>
                <div>
                    <button className="w-full bg-[#61A5C2] flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-[#5a96b0] hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800 transition-colors duration-200" type="submit">
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;