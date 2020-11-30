import React, { Component } from 'react'
//import './Home.css'
import Call from './Call.js'
import text from './inputnumberstocall.js'
//import TableRow from './TableRow';
import { w3cwebsocket } from "websocket";

const client = new w3cwebsocket('ws://127.0.0.1:4890');
const newarr = text.split(" ");

class Home extends Component {
   
    constructor(props) {
        super(props)
        this.state =  {
            button:false,
            start:false,
            data:[{phone_identifier:"1234_1",phone_number:"1234",phone_status:"idle",phone_id:"12"}
        ,{phone_identifier:"12342_1",phone_number:"1234",phone_status:"idle",phone_id:"12"}
          ]
    }}
    callprocess(e){
        console.log(e.currentTarget.value)
        this.setState({
        data: this.state.data.map((element)=>{
            if(element.phone_identifier==e.currentTarget.value){
                return {...element, phone_status:"calling"}
            }
            return element

        }
        )})
    
    }
    componentWillMount() {

        client.onopen = () => {
            console.log("open");

        }
        client.onmessage = (data) => {
            console.log(data);
            this.setState({
                data: JSON.parse(data.data)
            })
        }
    }
    render() {
        const {data} = this.state;
        console.log(data)
        // const rows = 
            //  <Call id={data.id} status={data.status}/>
        
        return (
            <div>
          <form onSubmit>
          <input
          type="submit" disabled={this.state.button} value={"start"}
          
        />
          </form>
                <table >
                <thead>
                <tr>
                <th>Phone</th>
                <th>status</th>
              </tr>
                </thead>

                <tbody>
                {data.map((item, i) => {
                    console.log(item)
                    // return <div>{"hi"}</div>
                    return <div> <h1> {item.phone_number}</h1>
                    <h1> {item.phone_id}</h1>
                    <h1> {item.phone_status}</h1>
                    <div><button onClick={(e)=>this.callprocess(e)}
                        disabled={false} value={item.phone_identifier} >
                    <span>{<p>"Call Now"</p>} </span>
                    </button></div></div>

                })}
                  {/* {rows} */}
                  
                  </tbody>
                  
                </table>
          </div>

            
                
            //     {console.log(this.state.message)}
            //     {this.state.message.status}
            //     </div>
        )
    }
}

// function Home() {
//     const newarr = text.split(" ");

//     return (
//         <div className="home">


//                     {newarr.map((item, i) => {

//                         return <Call id={item}/>

//                     })}





//         </div>
//     );
// }

export default Home;
