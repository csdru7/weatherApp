import axios from 'axios'
import React, { useState } from 'react'

export const Delete = () => {
  const [inputCity, setInputCity] = useState('')
  const [inputDate, setInputDate] = useState('')
  const [inputMessage, setInputMessage] = useState({});

  const handleDelete = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('jwtToken')

    if (inputCity.length <= 0 || inputDate.length <= 0) {
      alert("Please Enter the City Name and Date")
      return
    }

    try {
      const response = await axios.delete(`http://localhost:8080/api/weather/delete/${inputCity}/${inputDate}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        data: {
          cityName: inputCity,
          date: inputDate
        }
      })

      if (response.status === 200) {
        setInputMessage({ success: "Data deleted successfully" })
        setInputCity('')
        setInputDate('')
      } else {
        setInputMessage({ error: "No data found to delete" })
      }
    } catch (err) {
      console.log(err);
      setInputMessage({ error: err.response.data })
    }

  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6 col-xl-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="mb-4 text-center">Delete Weather Data</h3>
              <form onSubmit={handleDelete}>
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
                  <button type="submit" className='btn btn-danger mt-2 w-100'>Delete</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
