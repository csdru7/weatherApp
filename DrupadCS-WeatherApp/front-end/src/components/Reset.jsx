import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Reset() {
  const [user, setUser] = useState({
    userName: '',
    password: '',
    email: '',
    roles: 'USER'
  });
  const [errors, setErrors] = useState({

  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    let errors = {}
    if (!user.userName.trim()){
      errors.userName = "Username is required";
    }else if(user.userName.trim().length < 3){
      errors.userName = "Username must be at least 3 characters long";
    }

    // Password validation
    if (!user.password.trim()) {
      errors.password = "Password is required";
    }else if(user.password.trim().length < 6){
      errors.password = "Password must be at least 6 characters long";
    }

    // Email validation
    if (!user.email.trim() || user.email < 5) {
      errors.email = "Email is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (validateForm()) {

      try {
        const response = await axios.put('http://localhost:8080/api/weather/user/reset', user);
        if (response.status === 200) {
          setMessage(response.data)
        }
      } catch (error) {
        if (error.response) {
          // If server responded with a status outside of the 2xx range
          if (error.response.status === 400) {
            setErrors({ email: "Your Email is not registered with us" });
          } else {
            setErrors({ general: error.response.data || "An error occurred" });
          }
        } else if (error.request) {
          // If the request was made but no response was received
          setErrors({ general: "No response from the server. Please try again later." });
        } else {
          // If something else caused the error
          setErrors({ general: "An unexpected error occurred" });
        }
      }
    }
  }
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh', background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' }}>
      <div className="card p-4 shadow-lg col-md-6 col-lg-4">
        <h2 className="text-center fw-bold mb-4">Reset Password</h2>
        <form onSubmit={handleReset}>
          <div className="form-group mb-3">
            <label className="fw-semibold">Email:</label>
            <input
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}

            <label className="fw-semibold">Username:</label>
            <input
              type="text"
              className={`form-control ${errors.userName ? 'is-invalid' : ''}`}
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              placeholder="Enter your user name"
            />
            {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}
            <label className="fw-semibold">Password:</label>
            <input
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          {message && (
            <div className="alert alert-success m-2" role="alert">
              {message}
            </div>
          )}
          {errors.general && (
            <div className="alert alert-danger m-2" role="alert">
              {errors.general}
            </div>
          )}
          <div className="mb-3">
            <button type="submit" className="btn btn-primary w-100 fw-semibold">Reset</button>
          </div>
        </form>
        <div className="text-center">
          <a onClick={() => navigate("/login")} className="link-secondary text-decoration-none ms-2" style={{ cursor: 'pointer' }}>
            Back to Login
          </a>
        </div>
      </div>
    </div>
  )
}
