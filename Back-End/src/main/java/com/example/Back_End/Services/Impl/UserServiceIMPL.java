package com.example.Back_End.Services.Impl;
import com.example.Back_End.DTO.LoginDTO;
import com.example.Back_End.DTO.UserDTO;
import com.example.Back_End.Entity.FuelStation;
import com.example.Back_End.Entity.User;
import com.example.Back_End.Entity.VehicleOwner;
import com.example.Back_End.Repository.FuelStationRepository;
import com.example.Back_End.Repository.UserRepository;
import com.example.Back_End.Repository.VehicleOwnerRepository;
import com.example.Back_End.Response.LoginResponse;
import com.example.Back_End.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceIMPL implements UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private VehicleOwnerRepository vehicleOwnerRepository;
    @Autowired
    private FuelStationRepository fuelStationRepository;

    @Override
    public String addUser(UserDTO userDTO) {
        // Create and save the user in the User table
        User user = new User();
        user.setUsername(userDTO.getUserName());

        user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Encrypt the password


        user.setEmail(userDTO.getEmail());
        user.setPhone(userDTO.getPhone());
        user.setRole(userDTO.getRole());
        userRepository.save(user);

        // Save role-specific data
        if (userDTO.getRole().equalsIgnoreCase("vehicle_owner")) {

            VehicleOwner vehicleOwner = new VehicleOwner();
            vehicleOwner.setUser(user); // Establish the relationship
            vehicleOwner.setOwnerName(userDTO.getUserName());
            vehicleOwner.setEmail(userDTO.getEmail());
            vehicleOwner.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            vehicleOwner.setOwnerPhone(userDTO.getPhone());
            vehicleOwner.setVehicles(null);
            vehicleOwnerRepository.save(vehicleOwner);

        } else if (userDTO.getRole().equalsIgnoreCase("fuel_station")) {

            FuelStation fuelStation = new FuelStation();
            fuelStation.setUser(user); // Establish the relationship
            fuelStation.setStationName(userDTO.getStationName());
            fuelStation.setStationLocation(userDTO.getLocation());
            fuelStation.setStationContact(userDTO.getContact());
            fuelStationRepository.save(fuelStation);

        } else {
            throw new IllegalArgumentException("Invalid role provided");
        }

        return "User registered successfully";
    }



    @Override
    public LoginResponse loginUser(LoginDTO loginDTO) {

        Optional<User> userOptional = userRepository.findByEmail(loginDTO.getEmail());

        if (userOptional.isPresent()) {

            User user = userOptional.get();
            int userId = user.getId();
            String password = loginDTO.getPassword();
            String encodedPassword = user.getPassword();
            boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);

            if (isPwdRight) {
                Optional<User> newuser = userRepository.findOneByEmailAndPassword(
                        loginDTO.getEmail(), encodedPassword);
                if (newuser.isPresent()) {
                    return new LoginResponse(userId,"Login Success", true);
                } else {
                    return new LoginResponse(userId,"Login Failed", false);
                }
            } else {
                return new LoginResponse(userId,"Password does not match", false);
            }
        } else {
            return new LoginResponse(0,"Email does not exist", false);
        }
    }

}
