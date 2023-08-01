import React from "react";
import classes from '../openDoor/OpenDoor.module.css'
const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: 50
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: 'inherit',
    textAlign: 'right',
    transition:'width 1s ease-in-out'
  }

  const labelStyles = {
    padding: 5,
    paddingBottom:10,
    color: 'white',
    fontWeight: 'bold'
  }




  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}></span>
      </div>
    </div>
  );
};

export default ProgressBar;