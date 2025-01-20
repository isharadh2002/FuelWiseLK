package com.example.Back_End.Services.Impl;

import com.example.Back_End.DTO.VehicleDTO;
import com.example.Back_End.Entity.FuelTransaction;
import com.example.Back_End.Entity.Vehicle;
import com.example.Back_End.Repository.FuelTransactionRepository;
import com.example.Back_End.Repository.VehicleRepository;
import com.example.Back_End.Services.FuelQuotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;

@Service
public class FuelQuotaServiceIMPL implements FuelQuotaService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private FuelTransactionRepository fuelTransactionRepository;

    // Get the remaining fuel quota for a vehicle
    @Override
    public VehicleDTO getRemainingFuelQuota(int vehicleId) {
        Optional<Vehicle> vehicle = vehicleRepository.findById(vehicleId);
        if (vehicle.isPresent()) {
            VehicleDTO vehicleDTO = new VehicleDTO();
            vehicleDTO.setVehicleId(vehicle.get().getVehicleId());
            vehicleDTO.setVehicleFuelQuota(vehicle.get().getVehicleFuelQuota());
            return vehicleDTO;
        } else {
            throw new RuntimeException("Vehicle not found");
        }
    }

    // Update the remaining fuel quota for a vehicle and create a fuel transaction record
    @Override
    public VehicleDTO updateFuelQuota(int vehicleId, double fuelUsedOrAdded, String fuelType) {
        Optional<Vehicle> vehicle = vehicleRepository.findById(vehicleId);
        if (vehicle.isPresent()) {
            Vehicle existingVehicle = vehicle.get();
            // Update the remaining fuel quota
            double newFuelQuota = existingVehicle.getVehicleFuelQuota() + fuelUsedOrAdded;
            existingVehicle.setVehicleFuelQuota(newFuelQuota);
            vehicleRepository.save(existingVehicle);

            // Create a new FuelTransaction record
            FuelTransaction fuelTransaction = new FuelTransaction();
            fuelTransaction.setFuelType(fuelType);  // The type of fuel
            fuelTransaction.setPumpedLitres(String.valueOf(fuelUsedOrAdded));  // Amount added or used
            fuelTransaction.setRemainingQuota(String.valueOf(newFuelQuota));  // Updated fuel quota
            //fuelTransaction.setTransactionTime(LocalDateTime.ofInstant(Instant.ofEpochMilli(System.currentTimeMillis()), ZoneId.systemDefault()));  // Transaction timestamp
            fuelTransaction.setTransactionTime(LocalDateTime.now());  // Transaction timestamp
            fuelTransaction.setVehicle(existingVehicle);  // Set the vehicle for the transaction

            // Save the transaction
            fuelTransactionRepository.save(fuelTransaction);

            // Return the updated vehicle info with the new fuel quota
            VehicleDTO vehicleDTO = new VehicleDTO();
            vehicleDTO.setVehicleId(existingVehicle.getVehicleId());
            vehicleDTO.setVehicleFuelQuota(existingVehicle.getVehicleFuelQuota());
            return vehicleDTO;
        } else {
            throw new RuntimeException("Vehicle not found");
        }
    }
}