import React, { useEffect,Fragment, useState } from "react";
import classes from './RemoveStock.module.css'
import { useAuthContext } from "../../hooks/useAuthContext";
import RemoveStockForm from "./RemoveStockForm.js"

const RemoveStock = () => {  
  const [stock, setStock] = useState('')
  const {user} = useAuthContext()
  const storecode = user.storecode

  useEffect(() => {
    const fetchstock = async () => {
      //console.log(JSON.stringify({storecode}))
      const response = await fetch('http://localhost:4000/stock/view',{
        method: "POST",
        headers:{'Accept':'application/json','Content-Type': 'application/json','Authorisation':`Bearer ${user.token}`},
        body: JSON.stringify({storecode})
      })
      const json = await response.json()
      if (response.ok) {
        setStock(json)
    }
  }
  //if user exists try to fetch stock
  if (user){
    fetchstock();
  }
  //what does this [user] do?
}, [user])


const handleClick = () =>{
  if (user){
    const refreshStock = async () => {
      //console.log(JSON.stringify({storecode}))
      const response = await fetch('http://localhost:4000/stock/view',{
        method: "POST",
        headers:{'Accept':'application/json','Content-Type': 'application/json','Authorisation':`Bearer ${user.token}`},
        body: JSON.stringify({storecode})
      })
      const json = await response.json()
      if (response.ok) {
        setStock(json)
      }
    }
    refreshStock();
  }
}

  return (
    <Fragment>
      <div className={classes.addStockContainer}>
        <div className={classes.stockRemoveHeaderDiv}>
              <h1>Remove Stock</h1>
              <button onClick={handleClick}>Refresh</button>
        </div>
        <div className={classes.stockRemoveDiv}>
          <div className={classes.stockRemoveIndividual}>
            <div>
                <p>Name:</p>
            </div>
            <div>
            <p>Quantity:</p>
            </div>
            <div>
                <p>Expiry Date:</p>
            </div>
            <div className="stockIdDiv">
                <p>ID:</p>
            </div>
            <div>
              <p>Remove Quantity:</p>
            </div>
        </div>
            {stock && stock.map((stock) => (
              <RemoveStockForm key={stock._id} stock={stock} />
            ))}
          </div>

      </div>
    </Fragment>
  )
}


export default RemoveStock;
