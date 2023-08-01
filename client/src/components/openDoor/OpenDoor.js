import React, { Fragment, useEffect, useState } from "react";
import classes from './OpenDoor.module.css'
import ProgressBar from "../progressBar/ProgressBar.js";

const Door = () => {  
  const [isOpen, setIsOpen] = useState(false);
  const [completed,setCompleted] = useState(0);
  const toggleDoor = () => {
    if(isOpen == true){
      setCompleted(0)
    }
    else{
      setCompleted(100)
    }
    setIsOpen(!isOpen);
  }
  return (
    <Fragment>
      <div className={classes.doorContainer}>
        <h1 className="doorHeader">Delivery Door Status: {isOpen ? 'Open':'Closed'}</h1>
        <button onClick={toggleDoor} className={classes.doorButton}>{isOpen ? 'Close' : 'Open'}</button>
        <ProgressBar bgcolor={"#0d6efd"} completed={completed} />
        <div className={`${classes.door} ${isOpen ? classes.open : classes.closed}`}></div>
      </div>
    </Fragment>
  )
}


export default Door;
