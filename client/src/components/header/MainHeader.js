import React from "react";

import logo from "../../assets/logo.png";

import classes from './MainHeader.module.css'
const MainHeader = () =>{
    // let companyName = 'FridgeZone';

    return(
        <div className={classes.nav}>
            <div className={classes.logoWrapper}>
                <img src={logo} width="320" height="150"/>
            </div>
        </div>
    )
}

export default MainHeader;