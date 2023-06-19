import { createContext, useContext, useState, useEffect } from "react"

import { api } from "../services/api"

const AuthContext = createContext({})

function AuthProvider({ children }) {

    const [ data, setData ] = useState({})

    async function signIn({ email, password }) {
        
        try {

            const response = await api.post("/sessions", { email, password })
            const { user, token } = response.data                
            console.log(response.data)

            localStorage.setItem("@pocketnotes:user", JSON.stringify(user))
            localStorage.setItem("@pocketnotes:token", token)


            api.defaults.headers.common["Authorization"] = `Bearer ${token}`
            setData({ user })

        } catch (error) {

            if(error.response) {
                alert(error.response.data.message)
            } else {
                alert("It is not possible to log in. Try again later.")
            }

        }

    }

    const signOut = function () {
        localStorage.removeItem("@pocketnotes:user")
        localStorage.removeItem("@pocketnotes:token")

        setData( {} )
    }

    async function updateProfile ({ user, avatarFile }) {

        if (avatarFile) {
            const fileUploadForm = new FormData()
            fileUploadForm.append("avatar", avatarFile)

            const response = await api.patch("/users/avatar", fileUploadForm)
            user.avatar = response.data.avatar
        }


        try{

            await api.put("/users", user)

            localStorage.setItem("@pocketnotes:user", JSON.stringify(user))

            setData({ user, token: data.token })
            alert("Profile updated.")

        } catch (error) {

            if(error.response) {
                alert(error.response.data.message)
            } else {
                alert("It is not possible to log in. Try again later.")
            }

        }
    }

    useEffect( () => {
        const user = localStorage.getItem("@pocketnotes:user")
        const token = localStorage.getItem("@pocketnotes:token")

        if ( token && user ) {
            api.defaults.headers.common["Authorization"] = `Bearer ${token}`
            
            setData({ user: JSON.parse(user) })
        }
    }, [] )


    return(
        <AuthContext.Provider value={{ 
        signIn,
        user: data.user,
        updateProfile,
        signOut
        }}
        >
          {children}
        </AuthContext.Provider> 
    )
}

function useAuth() {
    const context = useContext(AuthContext)
    return context
}

export { AuthProvider, useAuth }



