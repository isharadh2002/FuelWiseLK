package org.example.department_of_motor_traffic.Service;

import org.example.department_of_motor_traffic.Entity.VehicleData;
import org.example.department_of_motor_traffic.Repository.MotorTrafficRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MotorTrafficService {

    private final MotorTrafficRepository repository;

    public MotorTrafficService(MotorTrafficRepository repository) {
        this.repository = repository;
    }

    public boolean validateVehicle(String licensePlate) {
        // Check if a vehicle with the given license plate exists in the database
        Optional<VehicleData> vehicle = repository.findByLicensePlate(licensePlate);
        return vehicle.isPresent();
    }
}
