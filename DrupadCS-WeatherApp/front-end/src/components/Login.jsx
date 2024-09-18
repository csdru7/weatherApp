import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Username is required.';
    } else if (formData.name.trim().length < 3) {
      errors.name = 'Username must be at least 3 characters long.';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required.';
    } else if (formData.password.trim().length < 4) {
      errors.password = 'Password must be at least 6 characters long.';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8080/api/weather/user/login', {
          userName: formData.name.trim(),
          password: formData.password.trim()
        });

        if (response.status === 200 && response.data.token) {
          const { token, roles } = response.data;

          // Store the token in local storage
          localStorage.setItem('jwtToken', token);

          if (roles.includes('ROLE_ADMIN')) {
            navigate('/admin-dashboard/weatherInfo'); // Redirect to admin dashboard
          } else if (roles.includes("ROLE_USER")) {
            navigate('/home'); // Redirect to user home page
          }
        } else {
          setErrors({ ...errors, password: 'Login failed. Please try again.' });
        }
      } catch (error) {
        if (error.response) {
          setErrors({ ...errors, password: 'Login failed. Please check your username and password.' });
          setFormData({...formData, password: ""})
        } else if (error.request) {
          setErrors({ ...errors, password: 'No response from server. Please try again later.' });
        } else {
          setErrors({ ...errors, password: 'An unexpected error occurred. Please try again.' });
        }
      }
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (


    <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh', background: 'linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)' }}>
      <div className="card p-4 shadow-lg col-md-6 col-lg-4">
        <h2 className="text-center fw-bold mb-4">Welcome to Weather Forecast</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group mb-3">
            <label className="fw-semibold">Username:</label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your username"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>
          <div className="form-group mb-3">
            <label className="fw-semibold">Password:</label>
            <input
              type="password"
              name="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="text-end mb-3">
            <a onClick={() => navigate("/reset-user")} className="link-secondary text-decoration-none" style={{ cursor: 'pointer' }}>Forgot Username or Password?</a>
          </div>
          <div className="mb-3">
            <button type="submit" className="btn btn-primary w-100 fw-semibold">Login</button>
          </div>
        </form>
        <div className="text-center">
          <p className="d-inline-block mb-0">Don't have an account?</p>
          <a onClick={goToRegister} className="link-success text-decoration-none ms-2" style={{ cursor: "pointer" }}>Register</a>
          </div>
      </div>
    </div>


  );
}
