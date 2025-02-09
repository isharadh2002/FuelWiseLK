package org.example.department_of_motor_traffic.Service;

import org.example.department_of_motor_traffic.DTO.VehicleRegistrationDTO;
import org.example.department_of_motor_traffic.Entity.VehicleData;
import org.example.department_of_motor_traffic.Repository.MotorTrafficRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;

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

    public VehicleRegistrationDTO addVehicle(VehicleRegistrationDTO vehicleRegistrationDTO) {
        try{
            VehicleData newVehicle = new VehicleData();
            newVehicle.setLicensePlate(vehicleRegistrationDTO.getLicensePlate());
            newVehicle.setOwnerName(vehicleRegistrationDTO.getOwnerName());
            newVehicle.setVehicleModel(vehicleRegistrationDTO.getVehicleModel());
            newVehicle.setDateOfRegistration(Date.valueOf(LocalDate.now()));
            VehicleData savedVehicle = repository.save(newVehicle);

            VehicleRegistrationDTO savedVehicleDTO = new VehicleRegistrationDTO();
            savedVehicleDTO.setId(savedVehicle.getId());
            savedVehicleDTO.setLicensePlate(savedVehicle.getLicensePlate());
            savedVehicleDTO.setOwnerName(savedVehicle.getOwnerName());
            savedVehicleDTO.setVehicleModel(savedVehicle.getVehicleModel());
            savedVehicleDTO.setDateOfRegistration(savedVehicle.getDateOfRegistration());

            return savedVehicleDTO;
        }
        catch(Exception e){
            throw new RuntimeException("Error while adding vehicle", e);
        }
    }
}
