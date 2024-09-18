import axios from 'axios';
import React, { useState } from 'react'

export const Add = () => {
  const [errors, setErrors] = useState({})
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
  })


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const token = localStorage.getItem('jwtToken')

      try {
        const response = await axios.post("http://localhost:8080/api/weather/insert",
          formData
          ,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        )

        if (response.status === 201) {
          setErrors({})
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
          console.log("success");
        }
      } catch (error) {
        if (error.response) {
          // The request was made, but the server responded with a status code that falls out of the range of 2xx
          console.error('Error Response:', error.response.data);
          console.error('Status:', error.response.status);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('No response received:', error.request);
        } else {
          // Something happened in setting up the request
          console.error('Error setting up the request:', error.message);
        }
      }
    }
  }

  return (
    <>
      <div className="container d-flex justify-content-center align-items-center">
        <div className='col-md-6 col-lg-6'>
          <h2 className='text-center'>Add Weather Data</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="formg-group">
              <label htmlFor="">CityName:</label>
              <input type="text" className={`form-control ${errors.cityName ? 'is-invalid' : ''}`} name='cityName' value={formData.cityName} onChange={handleChange} />
              {errors.cityName && <p>{errors.cityName} </p>}
            </div>
            <div className="formg-group">
              <label htmlFor="">Country Name:</label>
              <input type="text" className={`form-control ${errors.countryName ? 'is-invalid' : ''}`} name='countryName' value={formData.countryName} onChange={handleChange} />
              {errors.countryName && <p>{errors.countryName} </p>}
            </div>
            <div className="formg-group">
              <label htmlFor="">Weather Description:</label>
              <input type="text" className={`form-control ${errors.weatherDescription ? 'is-invalid' : ''}`} name='weatherDescription' value={formData.weatherDescription} onChange={handleChange} />
              {errors.weatherDescription && <p>{errors.weatherDescription} </p>}
            </div>
            <div className="formg-group">
              <label htmlFor="">Temprature (C):</label>
              <input type="number" className={`form-control ${errors.temperature ? 'is-invalid' : ''}`} name='temperature' value={formData.temperature} onChange={handleChange} />
              {errors.temperature && <p>{errors.temperature} </p>}
            </div>
            <div className="formg-group">
              <label htmlFor="">Cloud Description:</label>
              <input type="text" className={`form-control ${errors.cloudDescription ? 'is-invalid' : ''}`} name='cloudDescription' value={formData.cloudDescription} onChange={handleChange} />
              {errors.cloudDescription && <p>{errors.cloudDescription} </p>}
            </div>
            <div className="formg-group">
              <label htmlFor="">Wind Description:</label>
              <input type="text" className={`form-control ${errors.windDescription ? 'is-invalid' : ''}`} name='windDescription' value={formData.windDescription} onChange={handleChange} />
              {errors.weatherDescription && <p>{errors.windDescription} </p>}
            </div>
            <div className="formg-group">
              <label htmlFor="">Pressure:</label>
              <input type="number" className={`form-control ${errors.pressure ? 'is-invalid' : ''}`} name='pressure' value={formData.pressure} onChange={handleChange} />
              {errors.pressure && <p>{errors.pressure} </p>}
            </div>
            <div className="formg-group">
              <label htmlFor="">Humidity Percentage</label>
              <input type="number" className={`form-control ${errors.humidityPercentage ? 'is-invalid' : ''}`} name='humidityPercentage' value={formData.humidityPercentage} onChange={handleChange} />
              {errors.humidityPercentage && <p>{errors.humidityPercentage} </p>}
            </div>
            <div className="formg-group">
              <label htmlFor="">Date</label>
              <input type="date" className={`form-control ${errors.date ? 'is-invalid' : ''}`} name='date' value={formData.date} onChange={handleChange} />
              {errors.date && <p>{errors.date} </p>}
            </div>
            <div className='mt-3 mb-3'>
              <button onClick={handleSubmit} type='submit' className="btn btn-primary w-100">Add</button>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}
