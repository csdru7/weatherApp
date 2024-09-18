import React from "react";
import light_rain from "../../assets/light-rain.png"
import heavy_rain from "../../assets/heavy-rain.png"
import clouds from "../../assets/clouds.png"
import clears_sky from "../../assets/clear-sky.png"
import storm from "../../assets/storm.png"

export const WeatherDisplay = ({ weatherData, selectedDate }) => {
  if (!weatherData || weatherData.length === 0) {
    return <p className="text-center mt-4">No weather data available for the selected city.</p>;
  }

  // const currentWeather = weatherData.find(day => day.date === formatDate(new Date()))
  // const forecast = weatherData.filter(day => day.date !== formatDate(new Date()))
  //   .sort((a, b) => new Date(a.date) - new Date(b.date))

  const targetDate = selectedDate ? selectedDate : formatDate(new Date());

  // Find the weather for the target date (either user-selected or current)
  const specifiedDateWeather = weatherData.find(day => day.date === targetDate);

  // Remaining forecast data excluding the specified date
  const forecast = weatherData.filter(day => day.date !== targetDate)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const getWeatherImage = (description) => {
    const lowerCaseDescription = description.toLowerCase();
    if (lowerCaseDescription.includes("clear sky")) {
      return clears_sky;
    } else if (lowerCaseDescription.includes("heavy rain")) {
      return heavy_rain;
    } else if (lowerCaseDescription.includes("moderate rain")) {
      return light_rain;
    } else if (lowerCaseDescription.includes("light rain")) {
      return light_rain;
    } else if (lowerCaseDescription.includes("cloudy" || "clouds")) {
      return clouds;
    } else if (lowerCaseDescription.includes("thunder")) {
      return storm;
    }
    return "/images/default.png";
  };


  return (
    <div className="container-fluid mt-4">
      <div className="row">
        {/* {currentWeather && ( */}
        {specifiedDateWeather && (
          <div className="col-md-12 col-xl-12 mb-4">
            <div className="card shadow-lg rounded" style={{ backgroundColor: "#24484A", color: "#fff" }}>
              <div className="card-body">
                {!selectedDate ? <h5 className="card-title" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Current Weather</h5> : <h5 className="card-title" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>Weather on {specifiedDateWeather.date}</h5>} 
                
                <hr style={{ border: "1px solid #ccc" }} />
                <img src={getWeatherImage(specifiedDateWeather.weatherDescription)} 
                     alt={specifiedDateWeather.weatherDescription} 
                     style={{ width: "50px", height: "50px" }} />
                {/* <img src={getWeatherImage(currentWeather.weatherDescription)} alt={currentWeather.weatherDescription} style={{ width: "50px" , height: "50px"}} /> */}
                {/* <p className="card-text"><strong>City:</strong> {currentWeather.cityName} ({currentWeather.date})</p>
                <p className="card-text"><strong>Country:</strong> {currentWeather.countryName}</p>
                <p className="card-text"><strong>Temperature:</strong> {currentWeather.temperature}°C</p>
                <p className="card-text"><strong>Weather Description:</strong> {currentWeather.weatherDescription}</p>
                <p className="card-text"><strong>Cloud Description:</strong> {currentWeather.cloudDescription}</p>
                <p className="card-text"><strong>Humidity:</strong> {currentWeather.humidityPercentage}%</p>
                <p className="card-text"><strong>Wind:</strong> {currentWeather.windDescription}</p> */}
                <p className="card-text"><strong>City:</strong> {specifiedDateWeather.cityName} ({specifiedDateWeather.date})</p>
                <p className="card-text"><strong>Country:</strong> {specifiedDateWeather.countryName}</p>
                <p className="card-text"><strong>Temperature:</strong> {specifiedDateWeather.temperature}°C</p>
                <p className="card-text"><strong>Weather Description:</strong> {specifiedDateWeather.weatherDescription}</p>
                <p className="card-text"><strong>Cloud Description:</strong> {specifiedDateWeather.cloudDescription}</p>
                <p className="card-text"><strong>Humidity:</strong> {specifiedDateWeather.humidityPercentage}%</p>
                <p className="card-text"><strong>Wind:</strong> {specifiedDateWeather.windDescription}</p>
              
              </div>
            </div>
          </div>
        )}
        {forecast.length > 0 && !selectedDate &&
          <div className="mb-2">
            <h2 className="d-flex justify-content-center mx-2">{forecast.length} day Forecast</h2>
          </div>}
        {!selectedDate && forecast.map((day, index) => (
          <div className="col-md-3 col-xl-3 mb-4" key={index}>
            <div className="card shadow-sm rounded" style={{ backgroundColor: "#1a2b2c", color: "#e1e1e1" }}>
              <div className="card-body">
                <h5 className="card-title" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Forecast for {day.date}</h5>
                <hr style={{ border: "1px solid #444" }} />
                <img src={getWeatherImage(day.weatherDescription)} alt={day.weatherDescription} style={{ width: "50px", height: "50px" }} />
                <p className="card-text"><strong>City:</strong> {day.cityName}</p>
                <p className="card-text"><strong>Country:</strong> {day.countryName}</p>
                <p className="card-text"><strong>Temperature:</strong> {day.temperature}°C</p>
                <p className="card-text"><strong>Weather Description:</strong> {day.weatherDescription}</p>
                {/* <p className="card-text"><strong>Cloud Description:</strong> {day.cloudDescription}</p> */}
                {/* <p className="card-text"><strong>Humidity:</strong> {day.humidityPercentage}%</p> */}
                {/* <p className="card-text"><strong>Wind:</strong> {day.windDescription}</p> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
  // return `${day}-${month}-${year}`;
};
