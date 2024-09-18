package com.wipro.weather.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.*;

import java.time.LocalDate;

@Entity
public class WeatherReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "City name cannot be blank")
    @NotNull(message = "City name cannot be null")
    @Size(min = 2, max = 100, message = "City name must be between 2 and 100 characters")
    private String cityName;

    @NotBlank(message = "Country Name cannot be blank")
    private String countryName;

    @NotBlank(message = "Weather description cannot be blank")
    private String weatherDescription;

    @NotNull(message = "Temperature cannot be null")
    @Min(value = -100, message = "Temperature cannot be less than -100°C")
    @Max(value = 100, message = "Temperature cannot be greater than 100°C")
    private Double temperature;

    @NotBlank(message = "CloudDescription cannot be null")
    private String cloudDescription;

    @NotBlank(message = "Wind Description cannot be null")
    private String windDescription;


    private Integer pressure;
    private Integer humidityPercentage;
    private LocalDate date;

    public WeatherReport() {
    }

    public WeatherReport(Long id, String cityName, String countryName, String weatherDescription, Double temperature, String cloudDescription, String windDescription, Integer pressure, Integer humidityPercentage, LocalDate date) {
        this.id = id;
        this.cityName = cityName;
        this.countryName = countryName;
        this.weatherDescription = weatherDescription;
        this.temperature = temperature;
        this.cloudDescription = cloudDescription;
        this.windDescription = windDescription;
        this.pressure = pressure;
        this.humidityPercentage = humidityPercentage;
        this.date = date;
    }

    public WeatherReport(String cityName, String countryName, String weatherDescription, Double temperature, String windDescription, String cloudDescription, Integer pressure, Integer humidityPercentage, LocalDate date) {
        this.cityName = cityName;
        this.countryName = countryName;
        this.weatherDescription = weatherDescription;
        this.temperature = temperature;
        this.windDescription = windDescription;
        this.cloudDescription = cloudDescription;
        this.pressure = pressure;
        this.humidityPercentage = humidityPercentage;
        this.date = date;
    }

    public Long getId(){
        return id;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getCountryName() {
        return countryName;
    }

    public void setCountryName(String countryName) {
        this.countryName = countryName;
    }

    public String getWeatherDescription() {
        return weatherDescription;
    }

    public void setWeatherDescription(String weatherDescription) {
        this.weatherDescription = weatherDescription;
    }

    public Double getTemperature() {
        return temperature;
    }

    public void setTemperature(Double temperature) {
        this.temperature = temperature;
    }

    public String getCloudDescription() {
        return cloudDescription;
    }

    public void setCloudDescription(String cloudDescription) {
        this.cloudDescription = cloudDescription;
    }

    public String getWindDescription() {
        return windDescription;
    }

    public void setWindDescription(String windDescription) {
        this.windDescription = windDescription;
    }

    public Integer getPressure() {
        return pressure;
    }

    public void setPressure(Integer pressure) {
        this.pressure = pressure;
    }

    public Integer getHumidityPercentage() {
        return humidityPercentage;
    }

    public void setHumidityPercentage(Integer humidityPercentage) {
        this.humidityPercentage = humidityPercentage;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
