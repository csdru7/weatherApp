package com.wipro.weather.services;

import com.wipro.weather.dto.WeatherDto;
import com.wipro.weather.entity.WeatherReport;
import com.wipro.weather.exception.ResourceNotFoundException;
import com.wipro.weather.mapper.WeatherMapper;
import com.wipro.weather.repository.WeatherRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class WeatherService {
    @Autowired
    private WeatherRepository weatherRepository;

    public List<WeatherReport> getWeatherByCity(String city){
        return weatherRepository.findByCityName(city).orElseThrow(
                () -> new ResourceNotFoundException("Weather report with the "+city+" Not Found")
        );
    }

    public WeatherReport addWeatherReport(@Valid WeatherDto weatherDto){
        boolean exists = weatherRepository.existsByCityNameAndDate(weatherDto.getCityName(), weatherDto.getDate());
        if (exists){
            throw new ResourceNotFoundException("Weather Data Already exists");
        }
        WeatherReport weatherReport = new WeatherReport();
        weatherRepository.save(WeatherMapper.mapToWeatherReport(weatherDto, weatherReport));
        return weatherReport;
    }

    public WeatherReport getWeatherByCityAndDate(String cityName, LocalDate date) {
        return weatherRepository.findByCityNameAndDate(cityName, date).orElseThrow(
                () -> new ResourceNotFoundException("Weather report with given "+cityName+" and "+ date +" Not Found")
        );
    }

    public WeatherReport updateWeatherReportById(Long id, @Valid WeatherDto weatherDto) {
        Optional<WeatherReport> existingReportOpt = weatherRepository.findById(id);
        if(existingReportOpt.isPresent()){
            WeatherReport existingReport = existingReportOpt.get();

            WeatherReport weatherReport = WeatherMapper.mapToWeatherReport(weatherDto, existingReport);

//            existingReport.setCityName(weatherDto.getCityName());
//            existingReport.setDate(weatherDto.getDate());
//            existingReport.setWeatherDescription(weatherDto.getWeatherDescription());
//            existingReport.setPressure(weatherDto.getPressure());
//            existingReport.setTemperature(weatherDto.getTemperature());
//            existingReport.setCloudDescription(weatherDto.getCloudDescription());
//            existingReport.setHumidityPercentage(weatherDto.getHumidityPercentage());
//            existingReport.setCountryName(weatherDto.getCountryName());
//            existingReport.setWindDescription(weatherDto.getWindDescription());
            return weatherRepository.save(existingReport);
        }else {
            throw new ResourceNotFoundException("Weather report not found with id: " + id);
        }
    }


    public boolean deleteWeatherReportById(Long id) {
        Optional<WeatherReport> existingReportOpt = weatherRepository.findById(id);
        if (existingReportOpt.isPresent()){
            weatherRepository.deleteById(id);
            return true;
        }else {
            throw new ResourceNotFoundException("Weather report not found with id: " + id);
        }
    }

    public WeatherReport getWeatherById(Long id) {
        return weatherRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Weather report with the id: "+id+" Not Found")
        );
    }

    public void deleteWeatherByCityAndDate(String cityName, LocalDate date) {
        Optional<WeatherReport> weatherReport = weatherRepository.findByCityNameAndDate(cityName, date);
        if (weatherReport.isPresent()) {
            weatherRepository.delete(weatherReport.get());
        } else {
            throw new ResourceNotFoundException("Weather data not found for the specified city and date.");
        }
    }
}
