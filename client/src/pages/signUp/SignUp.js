import React from "react";
import classes from './SignUp.module.css'
import SignUpForm from './SignUpForm.js'



const SignUp = () =>{
    return(
        <div className={classes.inputBox}>
          <SignUpForm/>
        </div>
  )
}

export default SignUp;