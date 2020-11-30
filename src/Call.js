import React from 'react'
import './Call.css'
import {useStateValue} from "./StateProvider"
function Call({id}) {
    let callprocess=(e)=>{
        console.log(e)
        fetch('http://localhost:4830/call', {
  method: 'OPTIONS',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    "phone":e.currentTarget.value,
    "webhookURL":"http://localhost:3000/baks"
  })
})
        console.log(e.currentTarget.value+"id");

    }
    console.log(id+" in callllll")
    return (
       
    
    
        <div className="call">
            
                
                <p>
                   Phone Number: 
                    <strong>{id}</strong>
                </p>
               
             
                
                
                <button disabled={false} value={id} onClick={(e)=>callprocess(e)}>
                            <span>{<p>"Call Now"</p>} </span>
                            </button>
                <p>Status: Idle</p>
                {/* <p> {id.status? id.status:"idle"}</p> */}


            </div>
        
    )
}

export default Call
