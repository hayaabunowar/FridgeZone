import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import classes from "./AddStock.module.css"
const DeliveryRecord = () => {
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState('')
  const [expirydate, setExpirydate] = useState('')
  const [supplier, setSupplier] = useState('')

  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)
  
  const {user} = useAuthContext()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const storecode = user.storecode
    const stock = {name, quantity, expiryDate: expirydate, supplier,storecode}
    
    const response = await fetch('http://localhost:4000/stock', {
      method: 'POST',
      body: JSON.stringify(stock),
      headers: {
        'Content-Type': 'application/json',
        'Authorisation':`Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError("Ensure all fields are filled")
    }
    if (response.ok) {
      setMessage(` ${name} Added Successfully`)
      setError(null)
      setName('')
      setQuantity('')
      setExpirydate('')
      setSupplier('')
      //console.log('New stock added:', json)
      
    }

  }

  return (
    <form onSubmit={handleSubmit}> 

      <input
        className={classes.addStockInput}
        type="text"
        placeholder="Item Name"  
        onChange={(e) => setName(e.target.value)} 
        value={name}
      />

    
      <input 
        className={classes.addStockInput} 
        type="number" 
        placeholder="Quantity" 
        onChange={(e) => setQuantity(e.target.value)} 
        value={quantity}
      />

   
      <input 
        className={classes.addStockInput}
        type="date" 
        placeholder="Expiry Date"
        onChange={(e) => setExpirydate(e.target.value)} 
        value={expirydate} 
      />

      <input 
        className={classes.addStockInput}
        type="text" 
        placeholder="Supplier"
        onChange={(e) => setSupplier(e.target.value)} 
        value={supplier} 
      />

      <button type="submit" className={classes.addStockButton}>Add Item</button>
      {error &&(
        <div className={`${classes.addStockResult} ${classes.addStockError}`}>
            {error}
        </div>
      )}
      {message && (
            <div className={`${classes.addStockResult} ${classes.addStockMessage}`}>{message}</div>
      )}
    </form>
  )
}

export default DeliveryRecord