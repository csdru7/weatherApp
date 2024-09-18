import { useLocation, useNavigate } from "react-router-dom";

import { useEffect } from "react";

function TokenExpirationCheck() {
    const navigate = useNavigate();
    const location = useLocation();

    const isTokenExpired = () => {
        const token = localStorage.getItem('jwtToken');
        if (!token) return true;

        try {
            // Decode the token and check the expiration
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiry = payload.exp * 1000;
            if (Date.now() > expiry) {
                localStorage.removeItem('jwtToken')
                navigate("/login")
                return true
            }
        } catch (e) {
            localStorage.removeItem('jwtToken')
            return true; // In case of errors, assume the token is expired
        }
        return false
    };

    useEffect(() => {
        const path = location.pathname
        if (isTokenExpired() && path !== '/login' && path !== '/register' && path !=='/reset-user') {
            navigate('/login'); // Redirect to login if token is expired
        }
    }, [navigate, location]);
}

export default TokenExpirationCheck;