import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const WeatherForm = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    cityName: '',
    countryName: '',
    weatherDescription: '',
    temperature: '',
    cloudDescription: '',
    windDescription: '',
    pressure: '',
    humidityPercentage: '',
    date: '',
  });

  const [id, setId] = useState(null)
  const [inputCity, setInputCity] = useState('')
  const [inputDate, setInputDate] = useState('')
  const [inputMessage, setInputMessage] = useState({});

  const location = useLocation();
  const path = location.pathname;

  const isUpdate = location.pathname.includes('update');

  useEffect(() => {
    if (!isUpdate) {
      setFormData({
        cityName: '',
        countryName: '',
        weatherDescription: '',
        temperature: '',
        cloudDescription: '',
        windDescription: '',
        pressure: '',
        humidityPercentage: '',
        date: '',
      });
      setInputCity('');
      setInputDate('');
      setInputMessage({});
      setId(null);
      setErrors({});
    }
  }, [isUpdate]);

  useEffect(() => {
    if (isUpdate && inputDate && inputCity) {
      // Fetch data for the update operation
      const message = {}
      const token = localStorage.getItem('jwtToken')
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/weather/city/${inputCity}/date/${inputDate}`, {
            headers: {
              "Authorization": `Bearer ${token}`
            }
          });
          const { id, ...data } = response.data
          setId(id)
          setFormData(response.data);
          message.success = "The weather data on " + data.date
          setInputMessage(message)
        } catch (error) {
          console.error('Error fetching data for update:', error);

          message.error = "There is no data available for this Date: " + inputDate
          setInputMessage(message)

          setFormData({
            cityName: '',
            countryName: '',
            weatherDescription: '',
            temperature: '',
            cloudDescription: '',
            windDescription: '',
            pressure: '',
            humidityPercentage: '',
            date: '',
          })
        }
      };

      fetchData();
    }
  }, [isUpdate, inputCity, inputDate])


  const validateForm = () => {
    const errors = {};
    if (!formData.cityName || formData.cityName.length < 2 || formData.cityName.length > 100) {
      errors.cityName = "City name must be between 2 and 100 characters";
    }
    if (!formData.countryName) {
      errors.countryName = "Country Name cannot be blank";
    }
    if (!formData.weatherDescription) {
      errors.weatherDescription = "Weather description cannot be blank";
    }
    if (formData.temperature === '' || formData.temperature < -100 || formData.temperature > 100) {
      errors.temperature = "Temperature must be between -100°C and 100°C";
    }
    if (!formData.cloudDescription) {
      errors.cloudDescription = "Cloud Description cannot be blank";
    }
    if (!formData.windDescription) {
      errors.windDescription = "Wind Description cannot be blank";
    }
    if (formData.pressure === '' || isNaN(formData.pressure)) {
      errors.pressure = "Pressure should be a number";
    }
    if (formData.humidityPercentage === '' || isNaN(formData.humidityPercentage)) {
      errors.humidityPercentage = "Humidity Percentage should be a number";
    }
    if (!formData.date) {
      errors.date = "Date cannot be blank";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleGetData = async (e) => {
    e.preventDefault();
    if (inputCity && inputDate) {
      // Trigger useEffect to fetch data based on inputCity and inputDate
      setInputMessage({ success: '', error: '' });
      setErrors({})
    } else {
      alert('Please enter both City and Date');
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const token = localStorage.getItem('jwtToken');
      const url = isUpdate ? `http://localhost:8080/api/weather/modify/${id}` : "http://localhost:8080/api/weather/insert";

      try {
        const response = await axios(
          {
            method: isUpdate ? 'put' : 'post',
            url: url,
            data: formData,
            headers: {
              "Authorization": `Bearer ${token}`,
              "Content-Type": "application/json"
            }
          }
        )

        if (response.status === (isUpdate ? 200 : 201)) {
          setErrors({});
          setFormData({
            cityName: '',
            countryName: '',
            weatherDescription: '',
            temperature: '',
            cloudDescription: '',
            windDescription: '',
            pressure: '',
            humidityPercentage: '',
            date: '',
          });
          setErrors({})
          setInputCity('')
          setInputDate('')
          setId(null)
          setInputMessage({ success: 'Weather data submitted successfully!' });
          // navigate(`${path}`);
        }
      } catch (error) {
        if (error.response) {
          setErrors({general : error.response.data.errorMessage});
          console.error('Status:', error.response.status);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
      }
    }
  }

  return (

    <div className="container d-flex justify-content-center align-items-center">
      <div className='col-md-6 col-lg-6'>
        <div className="card shadow-sm">
          <div className="card-body">

            {isUpdate && <form onSubmit={handleGetData} action="">
              <div className='form-group mb-3'>
                <label htmlFor="inputCity">City Name:</label>
                <input className="form-control" type="text" name='inputCity' value={inputCity}
                  onChange={(e) => setInputCity(e.target.value)}
                />
                <label htmlFor="inputDate">Date:</label>
                <input className="form-control" type="date" name='inputDate' value={inputDate}
                  onChange={(e) => setInputDate(e.target.value)}
                />
                {inputMessage.error && <p className='text-danger'>{inputMessage.error}</p>}
                {inputMessage.success && <p className='text-success'>{inputMessage.success}</p>}
                <button type="submit" className='btn btn-primary mt-2'>Fetch</button>
              </div>
            </form>}

            <h2 className='text-center'>{isUpdate ? 'Update' : 'Add'} Weather Data</h2>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="cityName">City Name:</label>
                <input type="text" className={`form-control ${errors.cityName ? 'is-invalid' : ''}`} name='cityName' value={formData.cityName} onChange={handleChange} />
                {errors.cityName && <p className="text-danger">{errors.cityName}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="countryName">Country Name:</label>
                <input type="text" className={`form-control ${errors.countryName ? 'is-invalid' : ''}`} name='countryName' value={formData.countryName} onChange={handleChange} />
                {errors.countryName && <p className="text-danger">{errors.countryName}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="weatherDescription">Weather Description:</label>
                <input type="text" className={`form-control ${errors.weatherDescription ? 'is-invalid' : ''}`} name='weatherDescription' value={formData.weatherDescription} onChange={handleChange} />
                {errors.weatherDescription && <p className="text-danger">{errors.weatherDescription}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="temperature">Temperature (°C):</label>
                <input type="number" className={`form-control ${errors.temperature ? 'is-invalid' : ''}`} name='temperature' value={formData.temperature} onChange={handleChange} />
                {errors.temperature && <p className="text-danger">{errors.temperature}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="cloudDescription">Cloud Description:</label>
                <input type="text" className={`form-control ${errors.cloudDescription ? 'is-invalid' : ''}`} name='cloudDescription' value={formData.cloudDescription} onChange={handleChange} />
                {errors.cloudDescription && <p className="text-danger">{errors.cloudDescription}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="windDescription">Wind Description:</label>
                <input type="text" className={`form-control ${errors.windDescription ? 'is-invalid' : ''}`} name='windDescription' value={formData.windDescription} onChange={handleChange} />
                {errors.windDescription && <p className="text-danger">{errors.windDescription}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="pressure">Pressure:</label>
                <input type="number" className={`form-control ${errors.pressure ? 'is-invalid' : ''}`} name='pressure' value={formData.pressure} onChange={handleChange} />
                {errors.pressure && <p className="text-danger">{errors.pressure}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="humidityPercentage">Humidity Percentage:</label>
                <input type="number" className={`form-control ${errors.humidityPercentage ? 'is-invalid' : ''}`} name='humidityPercentage' value={formData.humidityPercentage} onChange={handleChange} />
                {errors.humidityPercentage && <p className="text-danger">{errors.humidityPercentage}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input type="date" className={`form-control ${errors.date ? 'is-invalid' : ''}`} name='date' value={formData.date} onChange={handleChange} />
                {errors.date && <p className="text-danger">{errors.date}</p>}
              </div>
              {errors.general && <p className='text-danger mt-3'>{errors.general}</p>}
              <div className='mt-3 mb-3'>
                <button type='submit' className="btn btn-primary w-100">{isUpdate ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
