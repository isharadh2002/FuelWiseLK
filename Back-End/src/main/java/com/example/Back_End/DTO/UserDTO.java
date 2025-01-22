package com.example.Back_End.DTO;

import lombok.Data;

@Data
public class UserDTO {

    private String userName;
    private String password;
    private String email;
    private String phone;
    private String role;

    private String stationName;      // For FuelStation
    private String contact;        // For FuelStation
    private String location;        // For FuelStation
}
