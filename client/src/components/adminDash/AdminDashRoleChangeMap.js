import classes from './AdminDash.module.css'
import React, { Fragment, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const ChangeUserRole = ({userRoleChange}) => {
    const {user} = useAuthContext()
    const storecode = user.storecode
    const _id = userRoleChange._id
    const [newRole,setNewRole]= useState('Chef')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const response = await fetch('http://localhost:4000/user/changerole', {
                method: 'PATCH',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                    'Authorisation':`Bearer ${user.token}`
                },
                body: JSON.stringify({storecode,newRole,_id})
            })
            const json = await response.json()
            if (!response.ok) {
                setMessage('')
                console.log(json)
                setError('User not found')
            }
            if (response.ok) {
                setMessage(`Role Changed Successfully`)
                setError(null)
                userRoleChange.jobtitle= newRole
            }
        }
        catch(error){
            console.log(error)
        }
    }
    return (
        <Fragment>
            <form onSubmit={handleSubmit} className={classes.adminDashIndividual}>
                <div>
                    <p>{userRoleChange.username}</p>
                </div>
                <div>
                    <p>{userRoleChange._id}</p>
                </div>
                <div>
                    <p>{userRoleChange.jobtitle}</p>
                </div>
                <div className={classes.userPassChangeDiv}>
                <select
                    value={newRole}
                    onChange={(e)=>setNewRole(e.target.value)}>
                        <option value="Chef">Chef</option>
                        <option value="DeliveryDriver">DeliveryDriver</option>
                        <option value="HealthAndSafetyOfficer">Health and Safety Officer</option>
                    </select>
                    <button>Submit</button>
                    {error &&(
                        <div>{error}</div>
                    )}
                    {message &&(
                        <div>{message}</div>
                    )}
                </div>

            </form>
        </Fragment>
    )
}


export default ChangeUserRole;