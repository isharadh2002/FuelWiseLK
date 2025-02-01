package com.example.Back_End.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateVehicleDTO {
    private String licensePlate;
    private String vehicleModel;
    private Double vehicleFuelQuota;
}
