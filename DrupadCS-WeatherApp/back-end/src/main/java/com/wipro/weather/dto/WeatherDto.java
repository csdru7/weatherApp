package com.wipro.weather.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;

public class WeatherDto{
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

    public WeatherDto(String cityName, String countryName, String weatherDescription, Double temperature, String cloudDescription, String windDescription, Integer pressure, Integer humidityPercentage, LocalDate date) {
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

    public WeatherDto() {

    }

    public @NotBlank(message = "City name cannot be blank") @NotNull(message = "City name cannot be null") @Size(min = 2, max = 100, message = "City name must be between 2 and 100 characters") String getCityName() {
        return cityName;
    }

    public void setCityName(@NotBlank(message = "City name cannot be blank") @NotNull(message = "City name cannot be null") @Size(min = 2, max = 100, message = "City name must be between 2 and 100 characters") String cityName) {
        this.cityName = cityName;
    }

    public @NotBlank(message = "Country Name cannot be blank") String getCountryName() {
        return countryName;
    }

    public void setCountryName(@NotBlank(message = "Country Name cannot be blank") String countryName) {
        this.countryName = countryName;
    }

    public @NotBlank(message = "Weather description cannot be blank") String getWeatherDescription() {
        return weatherDescription;
    }

    public void setWeatherDescription(@NotBlank(message = "Weather description cannot be blank") String weatherDescription) {
        this.weatherDescription = weatherDescription;
    }

    public @NotNull(message = "Temperature cannot be null") @Min(value = -100, message = "Temperature cannot be less than -100°C") @Max(value = 100, message = "Temperature cannot be greater than 100°C") Double getTemperature() {
        return temperature;
    }

    public void setTemperature(@NotNull(message = "Temperature cannot be null") @Min(value = -100, message = "Temperature cannot be less than -100°C") @Max(value = 100, message = "Temperature cannot be greater than 100°C") Double temperature) {
        this.temperature = temperature;
    }

    public @NotBlank(message = "CloudDescription cannot be null") String getCloudDescription() {
        return cloudDescription;
    }

    public void setCloudDescription(@NotBlank(message = "CloudDescription cannot be null") String cloudDescription) {
        this.cloudDescription = cloudDescription;
    }

    public @NotBlank(message = "Wind Description cannot be null") String getWindDescription() {
        return windDescription;
    }

    public void setWindDescription(@NotBlank(message = "Wind Description cannot be null") String windDescription) {
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
