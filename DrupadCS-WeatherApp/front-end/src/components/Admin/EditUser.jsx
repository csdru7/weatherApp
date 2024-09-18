import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Edituser() {
  const { state } = useLocation();
  const { user } = state;
  const [name, setName] = useState(user.userName || '');
  const [email, setEmail] = useState(user.email || '');
  const [password, setPassword] = useState('');
  const [roles, setroles] = useState(user.roles || '');
  const [errors, setErrors] = useState({ name: '', password: '', email: '', roles: '' });
  const [generalError, setGeneralError] = useState('')
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!name.trim() || name.trim().length < 3) {
      newErrors.name = "Username must be at least 3 characters long";
    }

    // Password validation
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.trim().length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    // Email validation
    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    // Roles validation
    if (!roles.trim()) {
      newErrors.roles = "Roles are required";
    }

    setErrors(newErrors);
    // Return true if there are no errors
    return Object.keys(newErrors).length === 0;
  }


  const handleEdit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return
    }
    const token = localStorage.getItem('jwtToken')
    try {
      const response = await axios.put('http://localhost:8080/api/weather/user/update', {
        userName: name.trim(),
        email: email.trim(),
        password: password.trim(),
        roles: roles.trim()
      },
        {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

      if (response.status === 200) {
        // Navigate to the login page after successful registration
        navigate('/admin-dashboard/userList');
      } else {
        // Handle unexpected status codes
        setGeneralError('Registration failed. Please try again.');
      }
    } catch (error) {
      // Log full error details
      console.error('Registration failed:', error.response ? error.response.data : error.message);

      // Handle error based on response
      if (error.response) {
        setGeneralError(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        setGeneralError('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className='col-md-6 col-lg-4'>
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className='text-center'>Edit user</h2>
            <form onSubmit={handleEdit}>
              <div className="form-group mt-3">
                <label>User Name:</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                // required
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}

              </div>
              <div className="form-group mt-3">
                <label>Email:</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                // required
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}

              </div>
              <div className="form-group mt-3">
                <label>Password:</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                // required
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="form-group mt-3">
                <label>Roles:</label>
                <input
                  type="roles"
                  className={`form-control ${errors.roles ? 'is-invalid' : ''}`}
                  value={roles}
                  onChange={(e) => setroles(e.target.value.toUpperCase())}
                // required
                />
                {errors.roles && <div className="invalid-feedback">{errors.roles}</div>}
              </div>
              {generalError && (
                <div className='alert alert-danger m-2' role='alert'>
                  {generalError}
                </div>
              )}
              <div className='mb-3'>
                <button type="submit" className="btn btn-primary mt-3 w-100">update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edituser;