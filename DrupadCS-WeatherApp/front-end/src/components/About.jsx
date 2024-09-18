import React from "react";

const About = () => {
    return (
        <div className="container my-5">
            <h2>About Weather Forecast App</h2>
            <p>
                Welcome to the Weather Forecast App, your one-stop solution for real-time weather updates and forecasts. 
                With this app, you can:
            </p>
            <ul>
                <li>Get accurate weather information for your city.</li>
                <li>View weather reports for multiple cities.</li>
                <li>Stay updated with hourly and weekly weather forecasts.</li>
                <li>Access weather data like temperature, humidity, wind speed, and more.</li>
            </ul>
            <p>
                This application is built using modern technologies like React for the frontend and Spring Boot for the backend.
                We aim to deliver accurate and real-time weather data to keep you prepared for all conditions.
            </p>
        </div>
    );
};

export default About;