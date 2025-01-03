package com.example.Back_End.Repository;

import com.example.Back_End.Entity.FuelStation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface FuelStationRepository extends JpaRepository<FuelStation, Integer> {


    Optional<FuelStation> findByStationID(int stationID);

    @Query(value = "SELECT * FROM FuelStation WHERE stationName = ?1", nativeQuery = true)
    Optional<FuelStation> findOneByStationName(String stationName);

    @Query(value = "SELECT * FROM FuelStation WHERE stationName = ?1 AND stationLocation = ?2", nativeQuery = true)
    Optional<FuelStation> findOneByStationNameAndStationLocation(String stationName, String stationLocation);

    @Query(value = "SELECT * FROM FuelStation WHERE stationID = ?1", nativeQuery = true)
    FuelStation getStationById(int StationID);
}
