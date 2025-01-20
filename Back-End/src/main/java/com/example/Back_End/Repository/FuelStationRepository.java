package com.example.Back_End.Repository;

import com.example.Back_End.Entity.FuelStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface FuelStationRepository extends JpaRepository<FuelStation, Integer> {


    Optional<FuelStation> findByStationID(int stationID);

    @Query(value = "SELECT * FROM fuel_station WHERE station_name = ?1", nativeQuery = true)
    Optional<FuelStation> findOneByStationName(String stationName);

    @Query(value = "SELECT * FROM fuel_station WHERE station_name = ?1 AND station_location = ?2", nativeQuery = true)
    Optional<FuelStation> findOneByStationNameAndStationLocation(String stationName, String stationLocation);

    @Query(value = "SELECT * FROM fuel_station WHERE stationID = ?1", nativeQuery = true)
    FuelStation getStationById(int StationID);
}
