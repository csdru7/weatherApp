import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('jwtToken');
    const location = useLocation();

    // Check if token exists and is valid (you can add more sophisticated checks here)
    const isAuthenticated = token !== null;

    return isAuthenticated ? (
        children
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};
export default PrivateRoute;