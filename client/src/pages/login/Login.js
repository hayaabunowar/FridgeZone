import React from "react";
import classes from './Login.module.css'
import LoginForm from "./LoginForm";
const Login = () => {  
  return (
    <div className={classes.inputBox}>
      <LoginForm/>
    </div>
  )
}

export default Login;