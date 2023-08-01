import React from "react";
import classes from './MainScreen.module.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

//add comments so we know whats going on with your initials
const MainPage = () =>{
  const navigate = useNavigate();

    return(
        <div className={classes.inputBox}>
          <Button variant="primary" onClick={()=> {
            navigate('/signUp');
            }}>
            Sign Up</Button>
          <Button variant="primary" onClick={()=> {
            navigate('/login');
            }}>
            Login</Button>
        </div>
    )
}

export default MainPage;