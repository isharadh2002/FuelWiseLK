package com.example.Back_End.Repository;

import com.example.Back_End.Entity.FuelStation;
import com.example.Back_End.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface FuelStationRepository extends JpaRepository<FuelStation, Integer> {


    Optional<FuelStation> findByStationID(int stationID);

    @Query(value = "SELECT * FROM fuel_station WHERE station_name = ?1", nativeQuery = true)
    Optional<FuelStation> findOneByStationName(String stationName);

    @Query(value = "SELECT * FROM fuel_station WHERE station_name = ?1 AND station_location = ?2", nativeQuery = true)
    Optional<FuelStation> findOneByStationNameAndStationLocation(String stationName, String stationLocation);

    @Query(value = "SELECT * FROM fuel_station WHERE stationID = ?1", nativeQuery = true)
    Optional<FuelStation> findStationById(int StationID);

    @Query(value = "SELECT * FROM fuel_station WHERE stationID = ?1", nativeQuery = true)
    FuelStation getStationById(int StationID);

    Optional<FuelStation> findOneByUser(User user);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM fuel_station WHERE stationID = ?1", nativeQuery = true)
    void deleteByStationID(int stationID);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO fuel_station (station_name, station_location, station_contact, user_id) VALUES (?1, ?2, ?3, ?4)", nativeQuery = true)
    void addFuelStation(String stationName, String stationLocation, String stationContact, int userID);
}
