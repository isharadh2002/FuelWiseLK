package com.example.Back_End.Services;


import com.example.Back_End.DTO.LoginDTO;
import com.example.Back_End.DTO.VehicleOwnerDTO;
import com.example.Back_End.Response.LoginResponse;

public interface VehicleOwnerService {

    String addVehicleOwner(VehicleOwnerDTO vehicleOwnerDTO);
    LoginResponse loginVehicleOwner(LoginDTO loginDTO);
}
