import React, { useEffect, useState,Fragment } from "react";
import classes from './AdminDash.module.css'
import { useAuthContext } from "../../hooks/useAuthContext";
import AdminDashRoleChangeMap from "./AdminDashRoleChangeMap.js"


const ChangeRole = () => { 

    const {user} = useAuthContext()
    const [userRoleChange,setUserRoleChange] = useState('')
    const storecode = user.storecode

    useEffect(() => {
        if (user){
          const getsUsers = async () => {
            //console.log(JSON.stringify({storecode}))
            const response = await fetch('http://localhost:4000/user/view',{
              method: "POST",
              headers:{'Accept':'application/json','Content-Type': 'application/json','Authorisation':`Bearer ${user.token}`},
              body: JSON.stringify({storecode})
            })
            const json = await response.json()
            if (response.ok) {
              setUserRoleChange(json)
            }
          }
        
        const intervalId = setInterval(() => {
            getsUsers();
          }, 600000);     
        getsUsers()
        return () => {
          clearInterval(intervalId);
        };
        
      }
      }, [user]);

    return(
        <Fragment>
            <div className={classes.adminDashContainer}>
              <div className={classes.adminDashDiv}>
                <div className={classes.adminDashIndividual}>
                  <div>
                      <p>UserName:</p>
                  </div>
                  <div>
                      <p>ID:</p>
                  </div>
                  <div>
                      <p>Current JobTitle:</p>
                  </div>
                  <div>
                      <p>New Job Title:</p>
                  </div>
              </div>
                {userRoleChange && userRoleChange.map((userRoleChange) => (
                  
                  <AdminDashRoleChangeMap key={userRoleChange._id} userRoleChange={userRoleChange} />
                ))}
              </div>

          </div>
        </Fragment>
        
    )
}


export default ChangeRole;


    
