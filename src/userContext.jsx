import { createContext, useState, useEffect } from "react"
import { createClient } from '@supabase/supabase-js'

export const UserContext = createContext()

export function UserProvider({ children }) {
  const [user, setUser] = useState(null)
  const [client, setClient] = useState(null)
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showCalendar, setShowCalendar] = useState(false)
  useEffect(() => {
    const url = import.meta.env.VITE_SUPABASE_URL
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

    if (url && anonKey) {
      const supabaseClient = createClient(url, anonKey)
      setClient(supabaseClient)

      // Verificar sesión existente al cargar
      supabaseClient.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setUser(session.user)
          setUserId(session.user.id)
        }
        setLoading(false)
      })

      // Escuchar cambios en el estado de autenticación
      const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => {
        if (session) {
          setUser(session.user)
          setUserId(session.user.id)
        } else {
          setUser(null)
          setUserId(null)
        }
        setLoading(false)
      })

      return () => subscription.unsubscribe()
    } else {
      setLoading(false)
    }
  }, [])


  const logout = () => {
    client.auth.signOut().then(() => {
      setUser(null)
      setUserId(null)
    })
  }

  const register = async({email, password, firstName, lastName, role}) => {
    const new_user = await client.auth.signUp({email, password, options: {data: {firstName: firstName, lastName: lastName, role: role}}})
    const { data, error } = await client.from("UsersData").insert([{"user_id": new_user.data.user.id, "nombre":firstName, "apellido": lastName}]).select()
    if (error) {
        console.error("Error inserting user data:", error);
    } else {
        console.log("User data inserted:", data);
    }
  }

  const registerDoctor = async({name, surname, calendlyURL, mail, speciality}) => {
    const { data, error } = await client.from("DoctorsData").insert([{"name": name, "surname": surname, "calendly_url": calendlyURL, "email": mail, "speciality": speciality}]).select()
    if (error) {
        console.error("Error inserting user data:", error);
    } else {
        console.log("User data inserted:", data);
    }
  }


  return (
    <UserContext.Provider value={{ user, setUser, client, setClient, setUserId, userId, loading, logout, register, showCalendar, setShowCalendar, registerDoctor }}>
      {children}
    </UserContext.Provider>
  )
}