import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ name: '', password: '', email: '' });
    const [generalError, setGeneralError] = useState('')
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};

        // Name validation
        if (!name.trim()) {
            errors.name = "Username is required";
        }else if( name.trim().length < 3){
            errors.name = "Username must be at least 3 characters long"
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
                roles: "USER"
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

    const goToLogin = () => {
        navigate('/login')
    }

    return (

        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: '100vh', background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' }}>
            <div className="card p-4 shadow-lg col-md-6 col-lg-4">
                <h2 className="text-center fw-bold mb-4">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="form-group mb-3">
                        <label className="fw-semibold">Username:</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your username"
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <label className="fw-semibold">Email:</label>
                        <input
                            type="email"
                            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                        {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                    </div>
                    <div className="form-group mb-3">
                        <label className="fw-semibold">Password:</label>
                        <input
                            type="password"
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    {generalError && (
                        <div className="alert alert-danger m-2" role="alert">
                            {generalError}
                        </div>
                    )}
                    <div className="mb-3">
                        <button type="submit" className="btn btn-primary mt-3 w-100 fw-semibold">Register</button>
                    </div>
                </form>
                <div className="text-center mt-3">
                    <p className="d-inline-block mb-0">Already have an account?</p>
                    <a onClick={goToLogin} className="link-success text-decoration-none ms-2" style={{ cursor: "pointer" }}>Login</a>
                </div>
            </div>
        </div>
    );
}

export default Register;