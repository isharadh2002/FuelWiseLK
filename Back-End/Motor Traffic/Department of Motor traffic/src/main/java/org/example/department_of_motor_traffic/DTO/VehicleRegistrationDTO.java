package org.example.department_of_motor_traffic.DTO;

import lombok.Data;

import java.util.Date;

@Data
public class VehicleRegistrationDTO {
    private Integer id;
    private Date dateOfRegistration;

    //Use only these when creating
    private String licensePlate;
    private String vehicleModel;
    private String ownerName;
}
