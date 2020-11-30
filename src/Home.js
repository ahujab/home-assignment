import React from 'react'
//import './Home.css'
import Call from './Call.js'
import text from './inputnumberstocall.js'

function Home() {
    const newarr = text.split(" ");

    return (
        <div className="home">
            
               
                    {newarr.map((item, i) => {
                        
                        return <Call id={item}/>
                        
                    })}




             
        </div>
    );
}

export default Home;
