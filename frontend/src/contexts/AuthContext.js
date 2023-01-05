import { createContext, useState, useEffect  } from "react";
import jwt_decode from 'jwt-decode';
import axios from 'axios';


const AuthtContext = createContext()
export default  AuthtContext;


export const AuthProvider = ({children}) =>{
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(()=>localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    let [logionMessage, setLoginMessage] = useState('')
    
    const  baseUrl = 'https://utime.fitinite.com/api'

    let getToken = (e)=>{
        e.preventDefault()
        return (
            axios.post(`${baseUrl}/token/`,{
                email: e.target.username.value,
                password: e.target.password.value,
            }).then((response) =>{
                setAuthTokens(response.data)
                setUser(jwt_decode(response.data.access))
                localStorage.setItem('authTokens', JSON.stringify(response.data))
            }).catch((error)=>{
                setLoginMessage(error.response.data.detail)
            })
        )
    }

    let logoutUser = ()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
    }

    

    const contextDate = {
        user,
        authTokens,
        loading,
        getToken,
        baseUrl,
        logoutUser,
        logionMessage
    }

    useEffect(()=>{
        const refreshToken = ()=>{
            axios.post(`${baseUrl}/token/refresh/`,{
                refresh: authTokens?.refresh
            }).then((response) =>{
                setUser(jwt_decode(response.data.access))
                var localData = {
                    refresh:authTokens?.refresh,
                    access:response.data.access,
                }
                setAuthTokens(localData)
                localStorage.setItem('authTokens', JSON.stringify(localData))
            }).catch((error)=>{
                logoutUser();
            })
    
            if (loading){
                setLoading(false)
            }
        }
        
        if(loading){
            refreshToken()
        }
        let munites = 1000*60*5
        const interval = setInterval(()=>{
            if(authTokens){
                refreshToken()
            }
        }, munites)
        return ()=> clearInterval(interval)
    }, [authTokens, loading,])

return (
    <AuthtContext.Provider value = {contextDate}>
        {loading ? null: children }
    </AuthtContext.Provider>
)
}