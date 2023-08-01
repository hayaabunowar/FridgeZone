import { useState } from "react";
import {useAuthContext} from './useAuthContext.js'
import {useNavigate} from 'react-router-dom'

export const useLogin = () =>{
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const navigate = useNavigate()
    
    const login = async(username,password,jobtitle,fullname) => {
        setIsLoading(true)
        setError(null)

        try{
            const response = await fetch('http://localhost:4000/user/login',{
                method: "POST",
                headers:{'Accept':'application/json','Content-Type': 'application/json'},
                body: JSON.stringify({username,password})
            })
            const json = await response.json()
            if(!response.ok){
                setIsLoading (false)
                setError(json.error)
            }
            if(response.ok){
                localStorage.setItem('user',JSON.stringify(json))
                dispatch({type: 'LOGIN', payload:json})
                setIsLoading(false)
                navigate('/home');
            }
        }
        catch(error){
            console.log({error})
        }
        
    }
    return {login,isLoading,error}
}
