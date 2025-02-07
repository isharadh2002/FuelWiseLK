package com.example.Back_End.Services.Impl;
import com.example.Back_End.DTO.LoginDTO;
import com.example.Back_End.DTO.UserDTO;
import com.example.Back_End.Entity.FuelStation;
import com.example.Back_End.Entity.User;
import com.example.Back_End.Entity.VehicleOwner;
import com.example.Back_End.Exceptions.UserException;
import com.example.Back_End.Repository.FuelStationRepository;
import com.example.Back_End.Repository.UserRepository;
import com.example.Back_End.Repository.VehicleOwnerRepository;
import com.example.Back_End.Response.LoginResponse;
import com.example.Back_End.Response.WebLoginResponse;
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
    public String addUser(UserDTO userDTO) throws UserException {

        if(userDTO.getRole().equals("vehicle_owner") || userDTO.getRole().equals("fuel_station")) {

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
                throw new UserException("Invalid role provided");
            }

            return "User registered successfully";
        }
        else{
            throw new UserException("Invalid role provided");
        }
    }

@Override
public UserDTO getUser(int userId) throws UserException {
    Optional<User> userOptional = userRepository.findById(userId);

    if (userOptional.isPresent()) {
        User user = userOptional.get();
        UserDTO userDTO = new UserDTO();
        userDTO.setUserName(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhone(user.getPhone());
        userDTO.setRole(user.getRole());

        return userDTO;
    } else {
        throw new UserException("User not found");
    }
}

    @Override
    public WebLoginResponse loginUser(LoginDTO loginDTO) {

            Optional<User> userOptional = userRepository.findByEmail(loginDTO.getEmail());

            if (userOptional.isPresent()) {

                User user = userOptional.get();
                int userId = user.getId();
                String role = user.getRole(); // Get the user role
                String password = loginDTO.getPassword();
                String encodedPassword = user.getPassword();
                boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);

                if (isPwdRight) {
                    Optional<User> newuser = userRepository.findOneByEmailAndPassword(
                            loginDTO.getEmail(), encodedPassword);

                    if (newuser.isPresent()) {
                        return new WebLoginResponse(userId, role, "Login Success", true);
                    } else {
                        return new WebLoginResponse(userId, role, "Login Failed", false);
                    }
                } else {
                    return new WebLoginResponse(userId, null, "Password does not match", false);
                }
            } else {
                return new WebLoginResponse(0, null, "Email does not exist", false);
            }
        }


        @Override
public String updateUser(int userId, UserDTO userDTO) throws UserException {
    Optional<User> userOptional = userRepository.findById(userId);

    if (userOptional.isPresent()) {
        User user = userOptional.get();
        if (userDTO.getUserName() != null && !userDTO.getUserName().isEmpty()) {
            user.setUsername(userDTO.getUserName());
        }
        if (userDTO.getEmail() != null && !userDTO.getEmail().isEmpty()) {
            user.setEmail(userDTO.getEmail());
        }
        if (userDTO.getPhone() != null && !userDTO.getPhone().isEmpty()) {
            user.setPhone(userDTO.getPhone());
        }
        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }
        userRepository.save(user);

        if (user.getRole().equalsIgnoreCase("vehicle_owner")) {
            Optional<VehicleOwner> vehicleOwnerOptional = vehicleOwnerRepository.findById(userId);
            if (vehicleOwnerOptional.isPresent()) {
                VehicleOwner vehicleOwner = vehicleOwnerOptional.get();
                if (userDTO.getUserName() != null && !userDTO.getUserName().isEmpty()) {
                    vehicleOwner.setOwnerName(userDTO.getUserName());
                }
                if (userDTO.getEmail() != null && !userDTO.getEmail().isEmpty()) {
                    vehicleOwner.setEmail(userDTO.getEmail());
                }
                if (userDTO.getPhone() != null && !userDTO.getPhone().isEmpty()) {
                    vehicleOwner.setOwnerPhone(userDTO.getPhone());
                }
                if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
                    vehicleOwner.setPassword(passwordEncoder.encode(userDTO.getPassword()));
                }
                vehicleOwnerRepository.save(vehicleOwner);
            }
        } else if (user.getRole().equalsIgnoreCase("fuel_station")) {
            Optional<FuelStation> fuelStationOptional = fuelStationRepository.findStationById(userId);
            if (fuelStationOptional.isPresent()) {
                FuelStation fuelStation = fuelStationOptional.get();
                if (userDTO.getStationName() != null && !userDTO.getStationName().isEmpty()) {
                    fuelStation.setStationName(userDTO.getStationName());
                }
                if (userDTO.getLocation() != null && !userDTO.getLocation().isEmpty()) {
                    fuelStation.setStationLocation(userDTO.getLocation());
                }
                if (userDTO.getContact() != null && !userDTO.getContact().isEmpty()) {
                    fuelStation.setStationContact(userDTO.getContact());
                }
                fuelStationRepository.save(fuelStation);
            }
        }

        return "User updated successfully";
    } else {
        throw new UserException("User not found");
    }
}

        //Mobile User

        @Override
        public String addMobileUser(UserDTO userDTO) throws UserException {
            if (!userDTO.getRole().equalsIgnoreCase("fuel_station")) {
                throw new UserException("Only Fuel Station Owners can register");
            }

            // Create and save the user
            User user = new User();
            user.setUsername(userDTO.getUserName());
            user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Encode password
            user.setEmail(userDTO.getEmail());
            user.setPhone(userDTO.getPhone());
            user.setRole(userDTO.getRole());
            user = userRepository.save(user); // Save user and retrieve the persisted object

            // Create and save the fuel station
            FuelStation fuelStation = new FuelStation();
            fuelStation.setUser(user); // Associate with the saved user
            fuelStation.setStationName(userDTO.getStationName());
            fuelStation.setStationLocation(userDTO.getLocation());
            fuelStation.setStationContact(userDTO.getContact());
            fuelStationRepository.save(fuelStation); // Save fuel station

            return "Fuel Station Owner registered successfully";
        }

    @Override
    public UserDTO getMobileUser(int userId) throws UserException {
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (!user.getRole().equalsIgnoreCase("fuel_station")) {
                throw new UserException("Only Fuel Station Owners can be retrieved");
            }

            UserDTO userDTO = new UserDTO();
            userDTO.setUserName(user.getUsername());
            userDTO.setEmail(user.getEmail());
            userDTO.setPhone(user.getPhone());
            userDTO.setRole(user.getRole());

            Optional<FuelStation> fuelStationOptional = fuelStationRepository.findOneByUser(user);
            if (fuelStationOptional.isPresent()) {
                FuelStation fuelStation = fuelStationOptional.get();
                userDTO.setStationName(fuelStation.getStationName());
                userDTO.setLocation(fuelStation.getStationLocation());
                userDTO.setContact(fuelStation.getStationContact());
            }

            return userDTO;
        } else {
            throw new UserException("User not found");
        }
    }


        @Override
        public String updateMobileUser(int userId, UserDTO userDTO) throws UserException {
            Optional<User> userOptional = userRepository.findById(userId);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                if (!user.getRole().equalsIgnoreCase("fuel_station")) {
                    throw new UserException("Only Fuel Station Owners can update their details");
                }

                if (userDTO.getUserName() != null && !userDTO.getUserName().isEmpty()) {
                    user.setUsername(userDTO.getUserName());
                }
                if (userDTO.getEmail() != null && !userDTO.getEmail().isEmpty()) {
                    user.setEmail(userDTO.getEmail());
                }
                if (userDTO.getPhone() != null && !userDTO.getPhone().isEmpty()) {
                    user.setPhone(userDTO.getPhone());
                }
                if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
                    user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
                }
                userRepository.save(user);

                Optional<FuelStation> fuelStationOptional = fuelStationRepository.findOneByUser(user);
                if (fuelStationOptional.isPresent()) {
                    FuelStation fuelStation = fuelStationOptional.get();
                    if (userDTO.getStationName() != null && !userDTO.getStationName().isEmpty()) {
                        fuelStation.setStationName(userDTO.getStationName());
                    }
                    if (userDTO.getLocation() != null && !userDTO.getLocation().isEmpty()) {
                        fuelStation.setStationLocation(userDTO.getLocation());
                    }
                    if (userDTO.getContact() != null && !userDTO.getContact().isEmpty()) {
                        fuelStation.setStationContact(userDTO.getContact());
                    }
                    fuelStationRepository.save(fuelStation);
                }

                return "Mobile user updated successfully";
            } else {
                throw new UserException("User not found");
            }
        }

    @Override
    public LoginResponse loginMobileUser(LoginDTO loginDTO) {

        Optional<User> userOptional = userRepository.findByEmail(loginDTO.getEmail());

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            int userId = user.getId();

            if (!user.getRole().equalsIgnoreCase("fuel_station")) {
                return new LoginResponse(userId,"Unauthorized: Only Fuel Station Owners can log in", false);
            }

            boolean isPwdRight = passwordEncoder.matches(loginDTO.getPassword(), user.getPassword());
            if (isPwdRight) {
                return new LoginResponse(userId,"Login Success", true);
            } else {
                return new LoginResponse(userId,"Password does not match", false);
            }
        } else {
            return new LoginResponse(0,"Email does not exist", false);
        }
    }

}
