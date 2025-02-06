package com.example.Back_End.Services;

import com.example.Back_End.DTO.VehicleDTO;
import com.example.Back_End.Exceptions.FuelQuotaException;

public interface FuelQuotaService {
    // Retrieve the remaining fuel quota for a vehicle
    VehicleDTO getRemainingFuelQuota(int vehicleId) throws FuelQuotaException;

    // Update the remaining fuel quota for a vehicle and create a fuel transaction
    VehicleDTO updateFuelQuota(int vehicleId, double fuelUsedOrAdded, String fuelType, int stationID) throws FuelQuotaException;

    //Reset fuel quota for all vehicles, this method needs to be called weekly
    String resetFuelQuotaForAllVehicles() throws FuelQuotaException;
}
