package com.example.Back_End.DTO;

import com.example.Back_End.Entity.FuelStation;
import com.example.Back_End.Entity.User;
import com.example.Back_End.Entity.VehicleOwner;
import lombok.Data;

import java.util.List;
import java.util.stream.Collectors;

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


    // Convert single User entity to UserDTO
        public static UserDTO convertUserToDTO(User user) {
            UserDTO userDTO = new UserDTO();
            userDTO.setUserName(user.getUsername());
            userDTO.setPassword(user.getPassword());
            userDTO.setEmail(user.getEmail());
            userDTO.setPhone(user.getPhone());
            userDTO.setRole(user.getRole());
            return userDTO;
        }

        // Convert a list of User entities to a list of UserDTOs
        public static List<UserDTO> convertToDTOs(List<User> users) {
            return users.stream()
                    .map(UserDTO::convertUserToDTO)
                    .collect(Collectors.toList());
        }

        // Convert UserDTO to User entity
        public static User convertToEntity(UserDTO userDTO) {
            User user = new User();
            user.setUsername(userDTO.getUserName());
            user.setPassword(userDTO.getPassword());
            user.setEmail(userDTO.getEmail());
            user.setPhone(userDTO.getPhone());
            user.setRole(userDTO.getRole());

            if ("fuel_station".equalsIgnoreCase(userDTO.getRole())) {

                FuelStation fuelStation = new FuelStation();
                fuelStation.setStationName(userDTO.getStationName());
                fuelStation.setStationContact(userDTO.getContact());
                fuelStation.setStationLocation(userDTO.getLocation());

                user.setFuelStation(fuelStation);

            } else if ("vehicle_owner".equalsIgnoreCase(userDTO.getRole())) {
                VehicleOwner vehicleOwner = new VehicleOwner();

                // Set properties for VehicleOwner if needed
                vehicleOwner.setEmail(userDTO.getEmail());
                vehicleOwner.setOwnerName(userDTO.getPhone());
                vehicleOwner.setOwnerName(userDTO.getUserName());
                vehicleOwner.setPassword(userDTO.getPassword());

                user.setVehicleOwner(vehicleOwner);
            }

            return user;
        }

}
