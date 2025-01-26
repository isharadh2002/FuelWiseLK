package com.example.Back_End.Services;

import com.example.Back_End.DTO.VehicleDTO;

import java.util.List;
import java.util.Optional;

public interface VehicleService {
    Optional<VehicleDTO> getVehicleById(int vehicleId);
    List<VehicleDTO> getAllVehicles();
}
