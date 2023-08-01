import classes from './AdminDash.module.css'
import React, { Fragment, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const ChangeUserPass = ({userPassChange}) => {
    const {user} = useAuthContext()
    const storecode = user.storecode
    const _id = userPassChange._id
    const [newPass,setNewPass] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
            const response = await fetch('http://localhost:4000/user/changepassword', {
                method: 'PATCH',
                headers: {
                    'Accept':'application/json',
                    'Content-Type': 'application/json',
                    'Authorisation':`Bearer ${user.token}`
                },
                body: JSON.stringify({storecode,newPass,_id})
            })
            const json = await response.json()
            if (!response.ok) {
                setMessage('')
                console.log(json)
                setError('Password requires minimum 4 characters: 1 lowercase, 1 uppercase 1 symbol, 1 number')
            }
            if (response.ok) {
                setMessage(`Changed Successfully`)
                setError(null)
                //console.log('New stock added:', json)
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
                    <p>{userPassChange.username}</p>
                </div>
                <div>
                    <p>{userPassChange._id}</p>
                </div>
                <div className={classes.userPassChangeDiv}>
                    <input 
                        type="text"
                        required
                        value={newPass}
                        placeholder = "NewPass1#"
                        onChange={(e) => setNewPass(e.target.value)}/>
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


export default ChangeUserPass;