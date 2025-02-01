package com.example.Back_End.Services.Impl;

import com.example.Back_End.DTO.UpdateVehicleDTO;
import com.example.Back_End.DTO.VehicleDTO;
import com.example.Back_End.Entity.Vehicle;
import com.example.Back_End.Exceptions.VehicleNotFoundException;
import com.example.Back_End.Repository.VehicleRepository;
import com.example.Back_End.Services.ManageVehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ManageVehicleServiceIMPL implements ManageVehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    // Get vehicle by ID
    @Override
    public VehicleDTO getVehicleById(int id) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new VehicleNotFoundException("Vehicle with ID " + id + " not found."));

        return new VehicleDTO(
                vehicle.getVehicleId(),
                vehicle.getLicensePlate(),
                vehicle.getVehicleOwner().getOwnerName(), // Assuming VehicleOwner has getOwnerName()
                vehicle.getVehicleFuelQuota()
        );
    }

    // Update vehicle settings
    @Override
    public VehicleDTO updateVehicleSettings(int id, UpdateVehicleDTO updateVehicleDTO) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new VehicleNotFoundException("Vehicle with ID " + id + " not found."));

        // Update only non-null fields
        if (updateVehicleDTO.getLicensePlate() != null) {
            vehicle.setLicensePlate(updateVehicleDTO.getLicensePlate());
        }
        if (updateVehicleDTO.getVehicleModel() != null) {
            vehicle.setVehicleModel(updateVehicleDTO.getVehicleModel());
        }
        if (updateVehicleDTO.getVehicleFuelQuota() != null) {
            vehicle.setVehicleFuelQuota(updateVehicleDTO.getVehicleFuelQuota());
        }

        Vehicle updatedVehicle = vehicleRepository.save(vehicle);
        return new VehicleDTO(
                updatedVehicle.getVehicleId(),
                updatedVehicle.getLicensePlate(),
                updatedVehicle.getVehicleOwner().getOwnerName(),
                updatedVehicle.getVehicleFuelQuota()
        );
    }

    // Delete vehicle
    @Override
    public void deleteVehicle(int id) {
        if (!vehicleRepository.existsById(id)) {
            throw new VehicleNotFoundException("Vehicle with ID " + id + " not found.");
        }
        vehicleRepository.deleteById(id);
    }
}
