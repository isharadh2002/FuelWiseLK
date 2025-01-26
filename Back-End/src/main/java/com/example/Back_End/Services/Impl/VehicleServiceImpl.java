package com.example.Back_End.Services.Impl;

import com.example.Back_End.DTO.VehicleDTO;
import com.example.Back_End.Entity.Vehicle;
import com.example.Back_End.Repository.VehicleRepository;
import com.example.Back_End.Services.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
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
}
