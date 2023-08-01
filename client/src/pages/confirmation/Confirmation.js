import React from "react";
import classes from './Confirmation.module.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

//add comments so we know whats going on with your initials
const Confirmation = () =>{
  const navigate = useNavigate();

    return(
        <div className={classes.inputBox}>
          <p>Please wait for confirmation from the Head Chef of the store you registered for</p>
          <p>For any queries please contact your store leader</p>
          <Button variant="primary" onClick={()=> {
            navigate('/login');
            }}>
            Login</Button>
        </div>
    )
}

export default Confirmation;