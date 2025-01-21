package com.example.Back_End.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleDTO {
    private int vehicleId;
    private String registrationNumber;
    private String ownerName;
    private double vehicleFuelQuota;
}
