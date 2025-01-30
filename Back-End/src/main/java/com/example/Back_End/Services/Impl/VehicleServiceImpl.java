package com.example.Back_End.Services.Impl;

import com.example.Back_End.DTO.VehicleDTO;
import com.example.Back_End.DTO.VehicleRegistrationDTO;
import com.example.Back_End.Entity.Vehicle;
import com.example.Back_End.Entity.VehicleOwner;
import com.example.Back_End.Exceptions.VehicleRegistrationException;
import com.example.Back_End.Repository.VehicleOwnerRepository;
import com.example.Back_End.Repository.VehicleRepository;
import com.example.Back_End.Services.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VehicleServiceImpl implements VehicleService {
    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private VehicleOwnerRepository vehicleOwnerRepository;

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
    public Vehicle saveVehicle(VehicleRegistrationDTO vehicleRegistrationDTO) throws VehicleRegistrationException {

        VehicleOwner owner = vehicleOwnerRepository.findById(vehicleRegistrationDTO.getOwnerId())
                .orElseThrow(() -> new VehicleRegistrationException("Vehicle owner not found by ID : " + vehicleRegistrationDTO.getOwnerId()
                + " Other details : "+ vehicleRegistrationDTO.getLicensePlate()+vehicleRegistrationDTO.getVehicleModel()));

        try {
            Vehicle vehicle = new Vehicle();
            vehicle.setLicensePlate(vehicleRegistrationDTO.getLicensePlate());
            vehicle.setVehicleModel(vehicleRegistrationDTO.getVehicleModel());
            vehicle.setVehicleFuelQuota(0);
            vehicle.setVehicleOwner(owner);

            return vehicleRepository.save(vehicle);
        }
        catch (Exception e) {
            throw new VehicleRegistrationException(e.getMessage());
        }
    }

    @Override
    public ResponseEntity<Vehicle> updateVehicle(Vehicle vehicle, int id) {
        Optional<Vehicle> existingVehicleOpt = vehicleRepository.findById(id);
        if (existingVehicleOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Vehicle existingVehicle = existingVehicleOpt.get();

        if (vehicle.getLicensePlate() != null && !vehicle.getLicensePlate().isBlank()) {
            existingVehicle.setLicensePlate(vehicle.getLicensePlate());
        }
        if (vehicle.getVehicleModel() != null && !vehicle.getVehicleModel().isBlank()) {
            existingVehicle.setVehicleModel(vehicle.getVehicleModel());
        }
        if (vehicle.getVehicleFuelQuota() > 0) {
            existingVehicle.setVehicleFuelQuota(vehicle.getVehicleFuelQuota());
        }

        Vehicle updatedVehicle = vehicleRepository.save(existingVehicle);
        return ResponseEntity.ok(updatedVehicle);
    }

    @Override
    public ResponseEntity<String> deleteVehicle(int vehicleId) {
        Optional<Vehicle> vehicle = vehicleRepository.findById(vehicleId);
        if (vehicle.isPresent()) {
            vehicleRepository.delete(vehicle.get());
            return ResponseEntity.ok("Vehicle deleted successfully.");
        } else {
            return ResponseEntity.status(404).body("Vehicle not found.");
        }
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
