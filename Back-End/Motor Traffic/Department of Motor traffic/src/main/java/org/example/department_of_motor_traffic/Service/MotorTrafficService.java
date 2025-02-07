package org.example.department_of_motor_traffic.Service;

import org.example.department_of_motor_traffic.Repository.MotorTrafficRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MotorTrafficService {

    private final MotorTrafficRepository repository;
    @Autowired
    public MotorTrafficService(MotorTrafficRepository repository) {
        this.repository = repository;
    }

    public boolean validateVehicle(String licensePlate) {
        // Check if a vehicle with the given license plate exists in the database
       if(licensePlate ==null ||licensePlate.trim().isEmpty()){
            throw new IllegalArgumentException("License plate should not be null");

       }
       return repository.findByLicensePlate(licensePlate).isPresent();
    }
}
