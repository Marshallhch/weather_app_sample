import React from 'react';
import './App.css';
import Axios from 'axios';
import DisplayWeather from './components/DisplayWeather';
import Navbar from './components/Navbar';

class App extends React.Component {

  state = {
    coords:{
      latitude: 45,
      longitude : 60
    },
    data:{},
    inputData:""
  }

  componentDidMount(){
    //1. get device location
    if(navigator.geolocation){
        //console.log('supported');
        navigator.geolocation.getCurrentPosition((position) => {
        //console.log(position.coords.latitude);
        let newCoords = {
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
        }

        this.setState({coords:newCoords});

        //API Call
        Axios.get(`http://api.weatherstack.com/current?access_key=06a5b65ec49fd2919d6138bc523abc1a&query=${this.state.coords.latitude},${this.state.coords.longitude}`).then(res => {
          //console.log(res);
          let weatherData = {
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            location: res.data.location.name,
            region: res.data.location.region,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.precip,
            humidity: res.data.current.humidity,
            img: res.data.current.weather_icons
          }
          this.setState({data:weatherData});//check react Components debugging
        })
      });
    } else {
      console.log('not supported');
    }
  }

  //track the input field
  change = (value) =>{
    //console.log(value);
    this.setState({inputData:value})
  }

  changeWeather= (event) =>{
    event.preventDefault();//없으면 인풋에 입력값이 안들어감
    //api call
    Axios.get(`http://api.weatherstack.com/current?access_key=06a5b65ec49fd2919d6138bc523abc1a&query=${this.state.inputData}`).then(res => {
      //console.log(res);
      let weatherData = {
        temperature: res.data.current.temperature,
        description: res.data.current.weather_descriptions[0],
        location: res.data.location.name,
        region: res.data.location.region,
        country: res.data.location.country,
        wind_speed: res.data.current.wind_speed,
        pressure: res.data.current.pressure,
        precip: res.data.current.precip,
        humidity: res.data.current.humidity,
        img: res.data.current.weather_icons
      }
      this.setState({data:weatherData});
    })
  }

  render(){
    return (
      <div className="App">
        <div className="container">
          <Navbar changeWeather = {this.changeWeather} changeRegion = {this.change} />
          <DisplayWeather weather={this.state.data} />
        </div>
      </div>
    );
  }
}

export default App;
