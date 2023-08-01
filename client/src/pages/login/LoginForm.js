import React, { Fragment ,useState} from "react";
import { useLogin } from "../../hooks/useLogin";

import classes from './Login.module.css'

const LoginForm = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {login,error,isLoading} = useLogin()

    const handleSubmit = async (e) =>{
        e.preventDefault() //stops page refreshing
        await login(username,password)
        //error checking client side
    }
    
    return (
        <Fragment>
            <h1>LOGIN</h1>
            <div className={classes.form}>
                <form onSubmit={handleSubmit}>
                    <label className={classes.formLabel}>Username</label>
                    <input 
                        type="text"
                        required
                        value={username}
                        placeholder = "Username"
                        onChange={(e) => setUsername(e.target.value)}/>
                    <label className={classes.formLabel}>Password</label>
                    <input 
                        type="password"
                        required
                        value={password}
                        placeholder = "Password"
                        onChange={(e) => setPassword(e.target.value)}/>
                    <button className={classes.btn} disabled={isLoading}>Submit</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </Fragment>
    )

}

export default LoginForm;