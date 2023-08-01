import { useState } from "react";
import {useAuthContext} from './useAuthContext.js'
import {useNavigate} from 'react-router-dom'

export const useSignUp = () =>{
    const [error,setError] = useState(null)
    const [isLoading,setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()
    const navigate = useNavigate()

    const signup = async(username,password,jobtitle,fullname,storecode) => {
        setIsLoading(true)
        setError(null)
        try{
            //http://localhost:4000/user/signup
            const response = await fetch('http://localhost:4000/tempuser/signup',{
                method: "POST",
                headers:{'Accept':'application/json','Content-Type': 'application/json'},
                body: JSON.stringify({username,password,jobtitle,fullname,storecode})
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
                navigate('/Confirmation');
            }
        }
        catch(error){
            console.log({error})
        }
        
    }
    return {signup,isLoading,error}
}
