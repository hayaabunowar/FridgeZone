import classes from './AdminDash.module.css'
import React, { Fragment, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const RemoveUser = ({userRemove}) => {
    const {user} = useAuthContext()
    const storecode = user.storecode
    const _id = userRemove._id
    //const [newRole,setNewRole]= useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const response = await fetch('http://localhost:4000/user/delete', {
                method: 'POST',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                    'Authorisation':`Bearer ${user.token}`
                },
                body: JSON.stringify({storecode,_id})
            })
            const json = await response.json()
            if (!response.ok) {
                setMessage('')
                setError('User not found')
            }
            if (response.ok) {
                setMessage(`User Removed Successfully`)
                setError(null)
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
                    <p>{userRemove.username}</p>
                </div>
                <div>
                    <p>{userRemove._id}</p>
                </div>
                <div className={classes.userPassChangeDiv}>
                    <button>Remove User</button>
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


export default RemoveUser;