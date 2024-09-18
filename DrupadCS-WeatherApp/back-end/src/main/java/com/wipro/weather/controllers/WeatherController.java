package com.wipro.weather.controllers;

import com.wipro.weather.dto.WeatherDto;
import com.wipro.weather.entity.WeatherReport;
import com.wipro.weather.exception.ResourceNotFoundException;
import com.wipro.weather.services.WeatherService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/weather")
@Validated
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @PostMapping("/insert")
    public ResponseEntity<WeatherReport> insertWeatherReport(@Valid @RequestBody WeatherDto weatherDto){
        WeatherReport report = weatherService.addWeatherReport(weatherDto);
        return new ResponseEntity<>(report, HttpStatus.CREATED);
    }

    @GetMapping("/city/{id}")
    public ResponseEntity<WeatherReport> getWeatherById(@PathVariable Long id){
        WeatherReport report = weatherService.getWeatherById(id);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/city/name/{city}")
    public ResponseEntity<List<WeatherReport>> getWeather(@PathVariable String city){
        List<WeatherReport> report = weatherService.getWeatherByCity(city);
        return ResponseEntity.ok(report);
    }

    @GetMapping("/city/{city}/date/{date}")
    public ResponseEntity<WeatherReport> getWeatherByCityAndDate(@PathVariable String city, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        WeatherReport report = weatherService.getWeatherByCityAndDate(city, date);
        return ResponseEntity.ok(report);
    }

    @PutMapping("modify/{id}")
    public ResponseEntity<WeatherReport> updateWeatherReport(@PathVariable Long id, @Valid @RequestBody WeatherDto weatherDto) {
        WeatherReport updatedReport = weatherService.updateWeatherReportById(id, weatherDto);
        if (updatedReport != null) {
            return ResponseEntity.ok(updatedReport);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> deleteWeatherReport(@PathVariable Long id) {
        boolean isRemoved = weatherService.deleteWeatherReportById(id);
        if (isRemoved) {
            return ResponseEntity.ok("Deleted the report");
        }
        return ResponseEntity.badRequest().body("There is no data for this ID");
    }

    @DeleteMapping("/delete/{cityName}/{date}")
    public ResponseEntity<String> deleteWeatherByCityAndDate(
            @PathVariable String cityName,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        try {
            weatherService.deleteWeatherByCityAndDate(cityName, date);
            return ResponseEntity.ok("Weather data deleted successfully.");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No weather data found for the specified city and date.");
        }
    }

}
