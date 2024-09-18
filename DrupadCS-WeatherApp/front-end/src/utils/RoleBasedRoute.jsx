import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const RoleBasedRoute = ({ element, allowedRoles, ...rest }) => {
  const token = localStorage.getItem('jwtToken'); // Adjust token retrieval as needed
  let userRole = null;

  if (token) {
    try {
        const decodedToken = jwtDecode(token);
        userRole = decodedToken.sub;
      } catch (error) {
        console.error('Token decoding error:', error);
      }
  }

  return allowedRoles.includes(userRole) ? element : <Navigate to="/home" />;
};

export default RoleBasedRoute;