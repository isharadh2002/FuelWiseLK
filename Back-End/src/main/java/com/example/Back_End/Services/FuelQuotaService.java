package com.example.Back_End.Services;

import com.example.Back_End.DTO.VehicleDTO;

public interface FuelQuotaService {
    // Retrieve the remaining fuel quota for a vehicle
    VehicleDTO getRemainingFuelQuota(int vehicleId);

    // Update the remaining fuel quota for a vehicle and create a fuel transaction
    VehicleDTO updateFuelQuota(int vehicleId, double fuelUsedOrAdded, String fuelType);
}
