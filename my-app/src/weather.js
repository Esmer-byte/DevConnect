import React, {Component} from 'react'
import axios from "axios"
export default class Weather extends Component{
    constructor(){
        super();
        this.state={
            weather:"Not yet gotten"
        }
    }
    handleButtonClick = () =>{
        axios.get('/getWeather').then(response=>{
            console.log(response.data.current.temperature);
            this.setState({
                weather:response.data.current.temperature
            })
        });
    }
    render(){
        return (
            <div>
                <button onClick={this.handleButtonClick}>Get Weather</button>
                <h1>The Weather in Toronto is: {this.state.weather}</h1>
            </div>
        );
    }
}