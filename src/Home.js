import React, { Component } from 'react'
import './Home.css'

import text from './inputnumberstocall.js'
import axios from 'axios';

import { w3cwebsocket } from "websocket";

const client = new w3cwebsocket('ws://127.0.0.1:4890');
const newarrofnumbers = text.split(" ");
var idreturn = ""
var dict = {}
class Home extends Component {

    constructor(props) {
        super(props)
        var allnumbersstate = []
        newarrofnumbers.map((e) => {
            allnumbersstate.push({ phone_identifier: e + "_1", phone_number: e, phone_status: "idle", phone_id: "12" })
        })

        newarrofnumbers.map((e) => {
            this.state = {
                data: allnumbersstate
            }
        })
    }

    async callprocess(e) {
        console.log("on click id" + e.currentTarget.value)
        const id = e.currentTarget.value
        const phone = id.substring(0, 11)
        console.log(phone)


        await axios.get('http://localhost:3000/baks2', { params: { "phone": phone } })
            .then((res) => {
                idreturn = res.data.id
                console.log(res)
                return res
            }).catch((error) => {
                console.log(error)
            });
        console.log("came " + idreturn)

        dict[idreturn] = id;
        console.log("dict" + dict[idreturn])

    }

    componentWillMount() {

        client.onopen = () => {
            console.log("open");
        }
        client.onmessage = (data) => {
            console.log(data);
            const parsed = JSON.parse(data.data)
           
            this.setState({
                data: this.state.data.map((element) => {
                    if (element.phone_identifier == dict[parsed.id]) {
                        console.log("match")
                        return { ...element, phone_status: parsed.status, phone_id: parsed.id }
                    }
                    return element
                }
                )
            })

        }
    }

    render() {
        const { data } = this.state;


        return (
            <div>

                <div><button onClick={(e) => this.callprocess(e)}
                    disabled={false} value={data[0].phone_identifier}

                ><span>{<p>"Call Now"</p>}</span></button>
                </div>
                <table >
                    <tbody>

                        <div>
                            {data.map((item, i) => {
                                console.log(item)
                                // return <div>{"hi"}</div>
                                return <div className="main">Phone Number: <strong>{item.phone_number}</strong>
                                    <th><td>Phone id: {item.phone_id}</td></th>
                                    <th>Phone status: {item.phone_status}</th>
                                </div>
                            })}


                        </div>
                    </tbody>

                </table>
            </div>

        )
    }
}


export default Home;
