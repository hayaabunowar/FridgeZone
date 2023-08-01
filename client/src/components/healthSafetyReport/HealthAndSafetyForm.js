import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import classes from "./HealthAndSafety.module.css"


const CreateHealthForm = () => {
  
  const {user} = useAuthContext()
  const username = user.username
  const storecode = user.storecode

  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:4000/healthandsafety/create', {
      method: 'POST',
      body: JSON.stringify({username,storecode}),
      headers: {
        'Content-Type': 'application/json',
        'Authorisation':`Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
        setError("Ensure connection is stable")
      }
    if (response.ok) {
      setMessage(` Report Generated Successfully`)
      setError(null)
      //console.log('New stock added:', json)
    }

  }

  return (
    <form onSubmit={handleSubmit}> 
      <button type="submit" className={classes.addStockButton}>Generate Report</button>
    </form>
  )
}

export default CreateHealthForm