package com.example.Back_End.Services.Impl;

import com.example.Back_End.DTO.LoginDTO;
import com.example.Back_End.DTO.VehicleOwnerDTO;
import com.example.Back_End.Entity.VehicleOwner;
import com.example.Back_End.Repository.VehicleOwnerRepository;
import com.example.Back_End.Response.LoginResponse;
import com.example.Back_End.Services.VehicleOwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class VehicleOwnerServiceIMPL implements VehicleOwnerService {

    @Autowired
    private VehicleOwnerRepository vehicleOwnerRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String addVehicleOwner(VehicleOwnerDTO vehicleOwnerDTO) {
        // Create a VehicleOwner instance using the DTO values
        VehicleOwner vehicleOwner = new VehicleOwner(
                null, // Primary key (ID) is auto-generated
                vehicleOwnerDTO.getOwnerName(),
                vehicleOwnerDTO.getOwnerEmail(),
                passwordEncoder.encode(vehicleOwnerDTO.getOwnerPassword()),
                vehicleOwnerDTO.getOwnerPhone(),
                null // The list of vehicles is initially null
        );

        // Save the VehicleOwner to the repository
        vehicleOwnerRepository.save(vehicleOwner);

        return "Vehicle Owner added successfully!";
    }

    @Override
    public LoginResponse loginVehicleOwner(LoginDTO loginDTO) {
        // Find the VehicleOwner by email
        Optional<VehicleOwner> vehicleOwnerOpt = vehicleOwnerRepository.findByEmail(loginDTO.getEmail());

        if (vehicleOwnerOpt.isPresent()) {
            VehicleOwner vehicleOwner = vehicleOwnerOpt.get();
            String password = loginDTO.getPassword();
            String encodedPassword = vehicleOwner.getPassword();
            boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);

            if (isPwdRight) {
                Optional<VehicleOwner> employee = vehicleOwnerRepository.findOneByEmailAndPassword(
                        loginDTO.getEmail(), encodedPassword);
                if (employee.isPresent()) {
                    return new LoginResponse("Login Success", true);
                } else {
                    return new LoginResponse("Login Failed", false);
                }
            } else {
                return new LoginResponse("Password does not match", false);
            }
        } else {
            return new LoginResponse("Email does not exist", false);
        }
    }
}
