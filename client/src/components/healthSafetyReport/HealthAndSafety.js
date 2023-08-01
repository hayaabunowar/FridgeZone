import React, { useEffect, useState,Fragment } from "react";
import classes from './HealthAndSafety.module.css'
import HealthAndSafetyForm from "./HealthAndSafetyForm.js";
import { useAuthContext } from "../../hooks/useAuthContext";
import HealthAndSafetyReportDetails from "./HealthAndSafetyReportDetails.js"

const HealthAndSafety = () => {  
  const [report, setReport] = useState(null)
  const {user} = useAuthContext()
  const storecode = user.storecode

  useEffect(() => {
    const fetchreports = async () => {
      //console.log(JSON.stringify({storecode}))
      const response = await fetch('http://localhost:4000/healthandsafety/get',{
        method: "POST",
        headers:{'Accept':'application/json','Content-Type': 'application/json','Authorisation':`Bearer ${user.token}`},
        body: JSON.stringify({storecode})
      })
      const json = await response.json()
      if (response.ok) {
        setReport(json)
    }
  }
    //if user exists try to fetch stock
    if (user){
      fetchreports();
    }

}, [user])



  const handleClick = () =>{
    if (user){
      const refreshReports = async () => {
        //console.log(JSON.stringify({storecode}))
        const response = await fetch('http://localhost:4000/healthandsafety/get',{
          method: "POST",
          headers:{'Accept':'application/json','Content-Type': 'application/json','Authorisation':`Bearer ${user.token}`},
          body: JSON.stringify({storecode})
        })
        const json = await response.json()
        if (response.ok) {
          console.log(json)
          setReport(json)
        }
      }
      refreshReports();
    }
  }

  return (
    <Fragment>
      <div className={classes.healthSafetyHeaderDiv}>
        <h1>Health And Safety Report</h1>
        <button onClick={handleClick}>Refresh</button>
      </div>
      <div>
        <HealthAndSafetyForm/>
      </div>
    
    <div className={classes.healthSafetyDiv}>
          <div className={classes.healthSafetyIndividual}>
            <div>
                <p>Reporter:</p>
            </div>
            <div>
            <p>Date Of Report:</p>
            </div>
            <div>
                <p>Items Expired:</p>
            </div>
            <div>
                <p>Quantity Expired:</p>
            </div>
        </div>
        {report && report.map((report) => (
              <HealthAndSafetyReportDetails key={report._id} report={report} />
            ))}
          </div>
    
    </Fragment>
  )
}


export default HealthAndSafety;
