package com.example.Back_End.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleRegistrationDTO {
    private String licensePlate;
    private String vehicleModel;
    private int ownerId; // Reference to VehicleOwner

    //Don't use this one when saving vehicle
    private int vehicleId;
    private double vehicleFuelQuota;
}
