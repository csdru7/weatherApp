package com.wipro.weather.repository;

import com.wipro.weather.entity.WeatherReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface WeatherRepository extends JpaRepository<WeatherReport, Long> {
    Optional<List<WeatherReport>> findByCityName(String cityName);

    Optional<WeatherReport> findByCityNameAndDate(String cityName, LocalDate date);

    boolean existsByDate(LocalDate date);

    boolean existsByCityNameAndDate(String cityName, LocalDate date);

}
