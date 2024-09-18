import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roles, setRoles] = useState('');
  const [errors, setErrors] = useState({ name: '', password: '', email: '', roles: '' });
  const [generalError, setGeneralError] = useState('')
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!name.trim() || name.trim().length < 3) {
      errors.name = "Username must be at least 3 characters long";
    }

    // Password validation
    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password.trim().length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    // Email validation
    if (!email.trim()) {
      errors.email = "Email is required";
    }

    // Roles validation
    if (!roles.trim()) {
      errors.roles = "Roles are required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return
    }

    try {
      const response = await axios.post('http://localhost:8080/api/weather/user/register', {
        userName: name.trim(),
        email: email.trim(),
        password: password.trim(),
        roles: roles.trim()
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
      <div className='col-md-8 col-lg-6 col-xl-4'>
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className='text-center mb-4'>Add User</h2>
            <form onSubmit={handleRegister}>
              <div className="form-group mb-4">
                <label htmlFor="username" className="form-label">User Name</label>
                <input
                  id="username"
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter username"
                  // required
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  // required
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  // required
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="form-group mb-4">
                <label htmlFor="roles" className="form-label">Roles</label>
                <input
                  id="roles"
                  type="text"
                  className={`form-control ${errors.roles ? 'is-invalid' : ''}`}
                  value={roles}
                  onChange={(e) => setRoles(e.target.value.toUpperCase())}
                  placeholder="Enter roles"
                  // required
                />
                {errors.roles && <div className="invalid-feedback">{errors.roles}</div>}
              </div>
              {generalError && (
                <div className='alert alert-danger mb-4' role='alert'>
                  {generalError}
                </div>
              )}
              <div className='text-center'>
                <button type="submit" className="btn btn-primary w-100">Add User</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
}

export default AddUser;