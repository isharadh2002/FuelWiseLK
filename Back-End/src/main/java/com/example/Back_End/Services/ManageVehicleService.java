package com.example.Back_End.Services;

import com.example.Back_End.DTO.UpdateVehicleDTO;
import com.example.Back_End.DTO.VehicleDTO;

public interface ManageVehicleService {

    // Get vehicle by ID
    VehicleDTO getVehicleById(int id);

    // Update vehicle settings
    VehicleDTO updateVehicleSettings(int id, UpdateVehicleDTO updateVehicleDTO);

    // Delete vehicle
    void deleteVehicle(int id);
}
