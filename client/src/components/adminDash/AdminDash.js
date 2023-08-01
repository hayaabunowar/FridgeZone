import React, { useEffect, useState,Fragment } from "react";
//import StockDetails from "./StockViewDetails";
import classes from './AdminDash.module.css'
import { useAuthContext } from "../../hooks/useAuthContext";
import ChangePass from "./ChangePass.js"
import ChangeRole from "./ChangeRole.js"
import RemoveUser from "./RemoveUser.js"



const AdminDash = () => { 


    const {user} = useAuthContext()
    const [sectionOpen,setSectionOpen] = useState(null)
    const handleClick = (param) =>{
        setSectionOpen(param)
    }


    return(
        <Fragment>
            <h1>Admin Dashboard</h1>            
            <button onClick={() => handleClick('ChangePass')}>Change Password</button>
            {sectionOpen === 'ChangePass' && <ChangePass />}
            <button onClick={() => handleClick('ChangeRole')}>Change Role</button>
            {sectionOpen === 'ChangeRole' && <ChangeRole />}
            <button onClick={() => handleClick('RemoveUser')}>Remove User</button>
            {sectionOpen === 'RemoveUser' && <RemoveUser />}
            
        </Fragment>
        
    )
}


export default AdminDash;