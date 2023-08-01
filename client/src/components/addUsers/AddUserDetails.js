import classes from './AddUsers.module.css'
import { useAuthContext } from "../../hooks/useAuthContext";
import React, { useState } from "react";


const AddUserDetails = ({resultArray}) => {

    const {user} = useAuthContext()
    const storecode = user.storecode
    const [userChange, setUserChange] = useState('');
    const [message, setMessage] = useState('')
    const [error, setError] = useState(null)

    const addUserDb = () =>{
        const sendAddReq = async() => {
            const _id = resultArray._id
            try{
                //http://localhost:4000/user/signup
                const response = await fetch('http://localhost:4000/tempuser/add',{
                    method: "POST",
                    headers:{'Accept':'application/json','Content-Type': 'application/json','Authorisation':`Bearer ${user.token}`},
                    body: JSON.stringify({"_id":_id})
                })
                const json = await response.json()
                if (response.ok) {
                    
                  }
            }
            catch(error){
                console.log({error})
            }
        }
        if (user){
            sendAddReq();
          }
    }

    const denyUserDb = () =>{
        const sendDenyReq = async() => {
            const _id = resultArray._id
            try{
                //http://localhost:4000/user/signup
                const response = await fetch('http://localhost:4000/tempuser/delete',{
                    method: "POST",
                    headers:{'Accept':'application/json','Content-Type': 'application/json','Authorisation':`Bearer ${user.token}`},
                    body: JSON.stringify({"_id":_id})
                })
                const json = await response.json()
                if (response.ok) {
                    
                  }
            }
            catch(error){
                console.log({error})
            }
        }
        if (user){
            sendDenyReq();
          }
    }

    return (
        <div className={classes.resultArrayIndividual}>
            <div>
                <p>{resultArray.username}</p>
            </div>
            <div>
            <p>{resultArray.jobtitle}</p>
            </div>
            <div>
                <p>{resultArray.fullname}</p>
            </div>
            <div>
                <p>{resultArray._id}</p>
            </div>
            <div className={classes.resultArrayButtonDiv}>
                    <button onClick={addUserDb}>Accept</button>
                    <button onClick={denyUserDb}>Decline</button>
                </div>
        </div>
    )
}


export default AddUserDetails;