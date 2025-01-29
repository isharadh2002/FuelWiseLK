package com.example.Back_End.Services.Impl;

import com.example.Back_End.DTO.VehicleDTO;
import com.example.Back_End.Entity.Vehicle;
import com.example.Back_End.Repository.VehicleRepository;
import com.example.Back_End.Services.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public Optional<VehicleDTO> getVehicleById(int vehicleId) {
        Optional<Vehicle> vehicle = vehicleRepository.findById(vehicleId);
        if (vehicle.isPresent()) {
            Vehicle vehicleEntity = vehicle.get();
            VehicleDTO vehicleDTO = new VehicleDTO(
                    vehicleEntity.getVehicleId(),
                    vehicleEntity.getLicensePlate(),
                    vehicleEntity.getVehicleOwner().getOwnerName(),
                    vehicleEntity.getVehicleFuelQuota()
            );
            return Optional.of(vehicleDTO);
        }
        return Optional.empty();
    }

    @Override
    public List<Vehicle> getAllVehicle() {
        return List.of();
    }

    @Override
    public Vehicle saveVehicle(Vehicle vehicle) {
        return null;
    }

    @Override
    public ResponseEntity<Object> updateVehicle(Vehicle vehicle, int id) {
        return null;
    }

    @Override
    public Vehicle deleteVehicle(Vehicle vehicle) {
        return null;
    }

    @Override
    public void updateQuota(Vehicle vehicle, double remainings) throws Exception {

    }

    @Override
    public List<VehicleDTO> getAllVehicles() {
        List<Vehicle> vehicles = vehicleRepository.findAll();
        return vehicles.stream()
                .map(vehicle -> new VehicleDTO(
                        vehicle.getVehicleId(),
                        vehicle.getLicensePlate(),
                        vehicle.getVehicleOwner().getOwnerName(),
                        vehicle.getVehicleFuelQuota()))
                .collect(Collectors.toList());
    }

    @Override
    public void updateFuelQuota(int id, double fuelQuota) throws Exception {
        // Fetch the vehicle by ID
        Optional<Vehicle> existingVehicle = vehicleRepository.findById(id);

        if (existingVehicle.isPresent()) {
            Vehicle vehicle = existingVehicle.get();

            // Update the fuel quota
            vehicle.setVehicleFuelQuota(fuelQuota);

            // Save the updated vehicle to the repository
            vehicleRepository.save(vehicle);
        } else {
            // Throw an exception if the vehicle is not found
            throw new Exception("Vehicle not found with ID: " + id);
        }
    }



}
