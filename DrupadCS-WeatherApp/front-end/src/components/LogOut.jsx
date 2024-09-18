import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LogOut = () => {
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault(); // Make sure to call this method correctly
        const confirmLogout = window.confirm("Do you want to logout?");
        if (confirmLogout) {
            localStorage.removeItem('jwtToken'); // Ensure 'jwtToken' is the correct key
            navigate("/login");
        }
    };

    return (
        <span onClick={handleLogout}>
            Logout
        </span>
    );
};
