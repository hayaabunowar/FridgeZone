import React, { Fragment, useState } from "react";
//import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import { useSignUp } from "../../hooks/useSignUp";
import classes from './SignUp.module.css'

const SignUpForm = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [jobtitle, setJobTitle] = useState('DeliveryDriver');
    const [fullname, setFullName] = useState('');
    const [storecode, setStoreCode] = useState('');

    const {signup,error,isLoading} = useSignUp()

    const handleSubmit = async (e) =>{
        e.preventDefault() //stops page refreshing
        //call hook
        await signup(username,password,jobtitle,fullname,storecode)
        //navigate('/home');
        
    }
    
    return (
        <Fragment>
            <h1 className="SignUp-head">SIGN UP</h1>
            <div className={classes.form}>
                <form onSubmit={handleSubmit}>
                    <label className={classes.formLabel}>Username</label>
                    <input 
                        type="text"
                        required
                        value={username}
                        placeholder = "Username"
                        onChange={(e) => setUsername(e.target.value)}/>
                    <label className={classes.formLabel}>Password</label>
                    <input 
                        type="password"
                        required
                        value={password}
                        placeholder = "Password"
                        onChange={(e) => setPassword(e.target.value)}/>
                    <label className={classes.formLabel}>Job Title</label>
                    <select
                    value={jobtitle}
                    onChange={(e)=>setJobTitle(e.target.value)}>
                        <option value="Chef">Chef</option>
                        <option value="DeliveryDriver">DeliveryDriver</option>
                        <option value="HealthAndSafetyOfficer">Health and Safety Officer</option>
                    </select>
                    <label className={classes.formLabel}>Full Name</label>
                    <input 
                        type="text"
                        required
                        value={fullname}
                        placeholder = "Full Name"
                        onChange={(e) => setFullName(e.target.value)}/>
                    <label className={classes.formLabel}>Store Code</label>
                    <input 
                        type="text"
                        required
                        value={storecode}
                        placeholder = "1234"
                        onChange={(e) => setStoreCode(e.target.value)}/>
                    
                    <button className={classes.btn} disabled={isLoading}>Submit</button>
                    {error && <div className="error">{error}</div>}
                </form>
            </div>
        </Fragment>
    )

}

export default SignUpForm;