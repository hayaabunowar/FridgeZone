import classes from './RemoveStock.module.css'
import React, { Fragment, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";

const RemoveStockDetails = ({stock}) => {
    const {user} = useAuthContext()
    const storecode = user.storecode
    const [quantityToRemove, setQuantityToRemove] = useState('');
    const stock_id = stock._id

    const [message, setMessage] = useState('')
    const [error, setError] = useState(null)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        const response = await fetch('http://localhost:4000/stock/removequantity', {
        method: 'PATCH',
        body: JSON.stringify({stock_id,quantityToRemove,storecode}),
        headers: {
            'Content-Type': 'application/json',
            'Authorisation':`Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setMessage('')
            setError("Ensure quantity removed does not exceed current amount")
        }
        if (response.ok) {
        setMessage(` Removed Successfully`)
        setError(null)
        setQuantityToRemove('')
        //console.log('New stock added:', json)
        }
            console.log("test")
    }

    return (
            <form onSubmit={handleSubmit} className={classes.stockRemoveIndividual}>
                <div>
                    <p>{stock.name}</p>
                </div>
                <div>
                <p>{stock.quantity}</p>
                </div>
                <div>
                    <p>{stock.expiryDate}</p>
                </div>
                <div>
                    <p>{stock._id}</p>
                </div>
                <div className={classes.RemoveStockRemoveDiv}>
                    <input 
                        type="text"
                        required
                        value={quantityToRemove}
                        placeholder = "0"
                        onChange={(e) => setQuantityToRemove(e.target.value)}/>
                    <button className={classes.RemoveButton}>Remove</button>
                </div>
        </form>
    )
}


export default RemoveStockDetails;