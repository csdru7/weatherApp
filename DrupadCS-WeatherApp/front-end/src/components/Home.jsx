import SearchBar from "./Weather/SearchBar";
import { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";
import { WeatherDisplay } from "./Weather/WeatherDisplay";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
  const BASE_URL = "http://localhost:8080/api/weather/"
  const [cityName, setCityName] = useState('')
  // const [weatherData, setWeatherData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredData, setFilteredData] = useState([])
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [search, setSearch] = useState(false)
  const isHome = useLocation().pathname.includes("/home")

  useEffect(() => {
    // Load favorites from localStorage when component mounts
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const filterWeatherData = (data) => {
    const today = new Date();
    const currentDate = formatDate(today)

    const nextFourDays = Array.from({ length: 5 }, (_, i) => {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      return formatDate(futureDate);
    });

    return data.filter(item => nextFourDays.includes(item.date));
  }

  const fetchWeather = async (city, date) => {
    setIsLoading(true);
    setError(null);
    // setWeatherData([])
    setFilteredData([])

    const token = localStorage.getItem('jwtToken')


    let apiUrl = `${BASE_URL}city/name/${city}`;
    if (date) {
      apiUrl = `${BASE_URL}city/${city}/date/${date}`
    }


    try {
      const response = await axios.get(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      })

      const data = response.data
      console.log(response.data);

      // if (response.data.length <= 0) {
      if (!data || (Array.isArray(data) && data.length === 0)) {
        setError(`Sorry, we’re currently unable to retrieve data for ${city}. Please try again later or check back soon.`)
      }
      else {
        const weatherArray = Array.isArray(data) ? data : [data];

        const filtered = filterWeatherData(weatherArray)
        setFilteredData(filtered)
      }
      // setWeatherData(data)
    } catch (error) {
      setError(`Sorry, we’re currently unable to retrieve data for ${city} on ${date}. Please try again later or check back soon.`)
      // setError(error.response.data.errorMessage);
      
      // setError('Failed to fetch the weather data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = () => {
    const trimmedCityName = cityName.trim();

    if (trimmedCityName) {
      // fetchWeather(trimmedCityName, selectedDate.trim());
      setSearch(prevState => !prevState);
      setError(null);
    } else {
      setError('Please enter a city name.');
      // setWeatherData([])
      setFilteredData([])
    }
  }

  useEffect(() => {
    if (cityName) {
      fetchWeather(cityName, selectedDate.trim())
    }else{
      fetchWeather("bengaluru")
    }
  }, [search])

  const handleCityChange = (e) => {
    setCityName(e.target.value)
  }

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const addToFavorites = (city) => {

    const isCityAlreadyFavorited = favorites.some(favorite => favorite === city);

    if (isCityAlreadyFavorited) {
      console.log(`${city} is already in your favorites.`);
      return;
    }
    const updatedFavorites = [...favorites, city];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFromFavorites = (city) => {
    const updatedFavorites = favorites.filter(fav => fav !== city);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <div className="col-md-4 col-lg-4">
          <div className="card shadow-lg p-4 mb-4 bg-white rounded">
            <div className="card-body">
              <SearchBar
                cityName={cityName}
                onCityChange={handleCityChange}
                onSearch={handleSearch}
                addToFavorites={addToFavorites}
                isHome={isHome}
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
              />
            </div>
            {isHome && favorites.length > 0 && (
              <div className="mt-4">
                <h5 className="fw-bold">Favorite Cities</h5>
                <ul className="list-group">
                  {favorites.map((city, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {city}
                      <div>
                        <button
                          className="btn btn-info btn-sm me-2"
                          onClick={() => fetchWeather(city)}
                        >
                          Fetch Weather
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => removeFromFavorites(city)}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-8 col-lg-8" >
          <div className="weather-display-container">
            {isLoading && <Loading />}
            {error && <ErrorMessage error={error} />}
            {filteredData.length > 0 && <WeatherDisplay weatherData={filteredData} selectedDate={selectedDate} />}
          </div>
        </div>
      </div>
    </div>

  )
}
