package com.example.Back_End.Services;

import com.example.Back_End.DTO.FuelStationDTO;

import java.util.List;

public interface FuelStationService {

    String addFuelStation(FuelStationDTO fuelStationDTO);
    FuelStationDTO getFuelStation(String stationName) throws Exception;
    FuelStationDTO updateFuelStation(FuelStationDTO fuelStationDTO);
    String deleteFuelStation(String stationName);
    List<FuelStationDTO> getAllFuelStations();
}
