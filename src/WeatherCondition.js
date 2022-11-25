import React, { Component } from "react";
import image from "./img/torontow.jpg";


const funcDay = (d) => {
  let days = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const day = days[d.getDay()], year=d.getFullYear();
  return `${day}, ${year}` ;
};

export default class WeatherCondition extends Component {
  constructor() {
    super();
    this.state = {
      weather: "",
    };
  }

  getWeather = async () => {
    const url =
      "http://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&appid=735594ee3095f134359c5673bd4c6abe";
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          weather: responseJson,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  componentDidMount = () => {
    this.getWeather();
  };

  render() {
    if (this.state.weather === "") {
      return (
        <div>
    
        </div>
      );
    } else {
      return (
        <div
          style={{
            boxSizing: "border-box",
            height: 740,
            margin: 0,
            padding: 20,
            backgroundSize: "cover",
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
          }}
        >
          
            <div style={{ flex: 1, border: 1, alignItems: "center" }}>
              <h1 style={{ color: "black", textAlign: "center" }}>{this.state.weather.name}</h1>
              <img
                style={{ width: 90, height: 120, marginLeft: 696 }}
                src={require("./img/weather.jpg")}
                alt="clouds"
              />
              <div
                style={{
                  flex: 1,
                  alignItems: "center",
                  flexDirection: "row",
                  marginTop: 10,
                }}
              >

                <h2 style={{ color: "black", textAlign: "center" }}>{funcDay(new Date())}</h2>

                <h3 style={{ color: "black", textAlign: "center"}}>{this.state.weather.main.temp.toFixed(0)}°C</h3>
                <h3 style={{ color: "black", textAlign: "center" }}>Max temp : {this.state.weather.main.temp_max.toFixed(0)}°C</h3>
                <h3 style={{ color: "black", textAlign: "center" }}>Min temp : {this.state.weather.main.temp_min.toFixed(0)}°C</h3>
                <h3 style={{ color: "black", textAlign: "center"}}>Humidity : {this.state.weather.main.humidity}%</h3>
                <h3 style={{ color: "black", textAlign: "center" }}>Feels : {this.state.weather.main.feels_like.toFixed(0)}°C</h3>
                <h3 style={{ color: "black", textAlign: "center" }}>Wind : {this.state.weather.wind.speed.toFixed(0)} km/h</h3>
                <h3 style={{ color: "black", textAlign: "center" }}>{this.state.weather.weather[0].description}</h3>
              </div>
            </div>
          </div>
      );
    }
  }
}