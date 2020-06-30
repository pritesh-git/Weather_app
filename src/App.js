import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Axios from "axios";
class App extends Component {

  state={
    coords:{
      lat:'',
      lng:'',
    },
    data:{},
    inputData:''
  }
  

  componentDidMount(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        let newCoords = {
          lat:position.coords.latitude,
          lng:position.coords.longitude
        }
        this.setState({coords:newCoords});

        Axios.get(`http://api.weatherstack.com/current?access_key=c418740d80616ebb7ad95ce4a356d943&query=${this.state.coords.lat},${this.state.coords.lng}`).then(res=>{
          let WeatherData={
            location : res.data.location.name,
            temperature: res.data.current.temperature,
            description: res.data.current.weather_descriptions[0],
            region: res.data.location.region,
            country: res.data.location.country,
            wind_speed: res.data.current.wind_speed,
            pressure: res.data.current.pressure,
            precip: res.data.current.precip,
            humidity:res.data.current.humidity,
            img:res.data.current.weather_icons
          }
          this.setState({data:WeatherData});
        })
      })
    }
    else{
      console.log("not supported")
    }
  }

  chngeRegion=(evt)=>{
    evt.preventDefault();
    Axios.get(`http://api.weatherstack.com/current?access_key=c418740d80616ebb7ad95ce4a356d943&query=${this.state.inputData}`).then(res=>{
      let WeatherData={
        location : res.data.location.name,
        temperature: res.data.current.temperature,
        description: res.data.current.weather_descriptions[0],
        region: res.data.location.region,
        country: res.data.location.country,
        wind_speed: res.data.current.wind_speed,
        pressure: res.data.current.pressure,
        precip: res.data.current.precip,
        humidity:res.data.current.humidity,
        img:res.data.current.weather_icons
      }
      this.setState({data:WeatherData});
    }).catch(err=>{
      alert("No Such Location In Database")

    })
  }


  render() {
    console.log(this.state)
    const{location,temperature,description,region,country,wind_speed,pressure,precip,humidity,img}=this.state.data;
    return (
      <div className="bg-info text-white justify-content-center  p-3 pt-5 " style={{ width: "100%", height: "100vh" }}>
        <div className="row justify-content-center ">
          <div className="cols-3 borer">
            <h1 className="col-12 text-monospace">Weather App</h1>
          </div>
        </div>
        <div className="row justify-content-center ">
          <div className="col-3 p-2">
            <div className="md-form input-group mb-3">
              <input type="text" className="form-control" placeholder="City Name" aria-label="City Name" aria-describedby="MaterialButton" onChange={(evt)=>{this.setState({inputData:evt.target.value})}}/>
              <div className="input-group-append">
                <button className="btn btn-md btn-primary m-0 px-3" type="button" id="MaterialButton" onClick={this.chngeRegion}>Search</button>
              </div>
            </div>
            <div className=" w-100 p-2 border">
             <div>
             <h1 className="float-left">{temperature}<sup>o</sup>C </h1>
             <img className="float-right" src={img} alt="weather-img" />
            </div><br />
            <h5 className="float-none">{description}</h5> 
               <h3>{location}</h3>
               <h4>{region},{country}</h4>
               <hr />
                <h6 className="text-monospace">Wind Speed(km/hr) : <span className="font-weight-light">{wind_speed} </span></h6>
                <h6 className="text-monospace">Pressure(millibar) : <span className="font-weight-light">{pressure}</span></h6>
                <h6 className="text-monospace">Precipitation(mm) : <span className="font-weight-light">{precip}</span></h6>
                <h6 className="text-monospace">Humidity(%): <span className="font-weight-light">{humidity}</span></h6>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
export default App;
