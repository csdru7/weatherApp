package com.wipro.weather.mapper;

import com.wipro.weather.dto.WeatherDto;
import com.wipro.weather.entity.WeatherReport;

public class WeatherMapper {

    public static WeatherReport mapToWeatherReport(WeatherDto dto, WeatherReport weather){

        weather.setCityName(dto.getCityName());
        weather.setCountryName(dto.getCountryName());
        weather.setWeatherDescription(dto.getWeatherDescription());
        weather.setTemperature(dto.getTemperature());
        weather.setCloudDescription(dto.getCloudDescription());
        weather.setWindDescription(dto.getWindDescription());
        weather.setPressure(dto.getPressure());
        weather.setHumidityPercentage(dto.getHumidityPercentage());
        weather.setDate(dto.getDate());
        return weather;
    }

    public static WeatherDto mapToDTO(WeatherReport weather) {

        WeatherDto dto = new WeatherDto();
        dto.setCityName(weather.getCityName());
        dto.setCountryName(weather.getCountryName());
        dto.setWeatherDescription(weather.getWeatherDescription());
        dto.setTemperature(weather.getTemperature());
        dto.setCloudDescription(weather.getCloudDescription());
        dto.setWindDescription(weather.getWindDescription());
        dto.setPressure(weather.getPressure());
        dto.setHumidityPercentage(weather.getHumidityPercentage());
        dto.setDate(weather.getDate());
        return dto;
    }
}
