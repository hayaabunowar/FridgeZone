import React, { useEffect, useState,Fragment } from "react";
//import StockDetails from "./StockViewDetails";
import classes from './AdminDash.module.css'
import { useAuthContext } from "../../hooks/useAuthContext";
import AdminDashPassChangeMap from "./AdminDashPassChangeMap.js"


const ChangePass = () => { 

    const {user} = useAuthContext()
    const [userPassChange,setUserPassChange] = useState('')
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
              setUserPassChange(json)
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
                      <p>New Password: Submit</p>
                  </div>
              </div>
                {userPassChange && userPassChange.map((userPassChange) => (
                  
                  <AdminDashPassChangeMap key={userPassChange._id} userPassChange={userPassChange} />
                ))}
              </div>

          </div>
        </Fragment>
        
    )
}


export default ChangePass;