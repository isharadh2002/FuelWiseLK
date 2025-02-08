package com.example.Back_End.Services.Impl;

import com.example.Back_End.DTO.FuelStationDTO;
import com.example.Back_End.DTO.FuelStationRegisterDTO;
import com.example.Back_End.DTO.FuelStationRetrieveDTO;
import com.example.Back_End.Entity.FuelStation;
import com.example.Back_End.Entity.User;
import com.example.Back_End.Exceptions.FuelStationException;
import com.example.Back_End.Repository.FuelStationRepository;
import com.example.Back_End.Repository.UserRepository;
import com.example.Back_End.Services.FuelStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FuelStationServiceIMPL implements FuelStationService {

    @Autowired
    private FuelStationRepository fuelStationRepository;
    @Autowired
    private UserRepository userRepository;

    public String addFuelStation(FuelStationRegisterDTO fuelStationRegisterDTO) {
        // Handle potential null user
        User user = userRepository.findById(fuelStationRegisterDTO.getUserID())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + fuelStationRegisterDTO.getUserID()));

        try {
            fuelStationRepository.addFuelStation(
                    fuelStationRegisterDTO.getStationName(),
                    fuelStationRegisterDTO.getStationLocation(),
                    fuelStationRegisterDTO.getStationContact(),
                    fuelStationRegisterDTO.getUserID()
            );
            return "Fuel Station added successfully";
        } catch (Exception e) {
            throw new RuntimeException("Error saving Fuel Station: " + e.getMessage());
        }
    }



    @Override
    public FuelStationDTO getFuelStation(String stationName) throws FuelStationException {

        // Find the FuelStation by stationName or throw an exception if not found
        FuelStation fuelStation = fuelStationRepository.findOneByStationName(stationName)
                .orElseThrow(() -> new FuelStationException("Fuel station not found with name: " + stationName));

        // Map entity to DTO
        FuelStationDTO fuelStationDTO = new FuelStationDTO();
        fuelStationDTO.setStationName(fuelStation.getStationName());
        fuelStationDTO.setStationLocation(fuelStation.getStationLocation());
        fuelStationDTO.setStationContact(fuelStation.getStationContact());
        return fuelStationDTO;

    }

    @Autowired
    private ModelMapper modelMapper;

    public List<FuelStationRetrieveDTO> getAllFuelStations() {
        List<FuelStation> fuelStationList = fuelStationRepository.findAll();

        return fuelStationList.stream().map(fuelStation -> {
            FuelStationRetrieveDTO retrieveDTO = modelMapper.map(fuelStation, FuelStationRetrieveDTO.class);
            retrieveDTO.setUserID(fuelStation.getUser().getId()); // Manually set userID
            return retrieveDTO;
        }).collect(Collectors.toList());
    }

    @Override
    public FuelStationDTO getFuelStationByID(int stationID) throws FuelStationException {

        // Find the FuelStation by stationID or throw an exception if not found
        FuelStation fuelStation = fuelStationRepository.findStationById(stationID)
                .orElseThrow(() -> new FuelStationException("Fuel station not found with stationID: " + stationID));

        // Map entity to DTO
        FuelStationDTO fuelStationDTO = new FuelStationDTO();
        fuelStationDTO.setStationName(fuelStation.getStationName());
        fuelStationDTO.setStationLocation(fuelStation.getStationLocation());
        fuelStationDTO.setStationContact(fuelStation.getStationContact());
        return fuelStationDTO;
    }

    @Override
    public int getStaionIDByUserID(int userID) throws FuelStationException {
        Optional<User> user = userRepository.findById(userID);
        if(user.isPresent()) {
            User fuelStationUser = user.get();
            Optional<FuelStation> fuelStation = fuelStationRepository.findOneByUser(fuelStationUser);
            if(fuelStation.isPresent()) {
                return fuelStation.get().getStationID();
            }
            else{
                throw new FuelStationException("Fuel station not found with UserID: " + userID);
            }
        }
        else{
            throw new FuelStationException("User not found with UserID: " + userID);
        }
    }

    @Override
    public FuelStationDTO updateFuelStation(FuelStationDTO fuelStationDTO) throws FuelStationException {
        // Validate input DTO
        if (fuelStationDTO.getStationName() == null || fuelStationDTO.getStationName().isBlank()) {
            throw new FuelStationException("Station name cannot be null or empty.");
        }


        // Check if the station exists
        FuelStation existingStation = fuelStationRepository.findOneByStationName(fuelStationDTO.getStationName())
                .orElseThrow(() -> new FuelStationException("Fuel station not found with name: " + fuelStationDTO.getStationName()));

        // Update fields only if they are not null
        if (fuelStationDTO.getStationLocation() != null && !fuelStationDTO.getStationLocation().isBlank()) {
            existingStation.setStationLocation(fuelStationDTO.getStationLocation());
        }
        if (fuelStationDTO.getStationContact() != null && !fuelStationDTO.getStationContact().isBlank()) {
            existingStation.setStationContact(fuelStationDTO.getStationContact());
        }

        // Save updated entity
        FuelStation updatedStation = fuelStationRepository.save(existingStation);

        // Map updated entity to DTO and return
        FuelStationDTO updatedStationDTO = new FuelStationDTO();
        updatedStationDTO.setStationName(updatedStation.getStationName());
        updatedStationDTO.setStationLocation(updatedStation.getStationLocation());
        updatedStationDTO.setStationContact(updatedStation.getStationContact());

        return updatedStationDTO;
    }

    @Override
    public FuelStationDTO updateFuelStation(int stationID, FuelStationDTO fuelStationDTO) throws FuelStationException {
        // Validate stationID
        if (stationID <= 0) {
            throw new FuelStationException("Invalid station ID: " + stationID + ". ID must be a positive number.");
        }

        // Check if the station exists
        FuelStation existingStation = fuelStationRepository.findStationById(stationID)
                .orElseThrow(() -> new FuelStationException("Fuel station not found with stationID: " + stationID));

        // Update fields only if they are not null
        if (fuelStationDTO.getStationName() != null && !fuelStationDTO.getStationName().isBlank()) {
            existingStation.setStationName(fuelStationDTO.getStationName());
        }
        if (fuelStationDTO.getStationLocation() != null && !fuelStationDTO.getStationLocation().isBlank()) {
            existingStation.setStationLocation(fuelStationDTO.getStationLocation());
        }
        if (fuelStationDTO.getStationContact() != null && !fuelStationDTO.getStationContact().isBlank()) {
            existingStation.setStationContact(fuelStationDTO.getStationContact());
        }

        // Save updated entity
        FuelStation updatedStation = fuelStationRepository.save(existingStation);

        // Map updated entity to DTO and return
        FuelStationDTO updatedStationDTO = new FuelStationDTO();
        updatedStationDTO.setStationName(updatedStation.getStationName());
        updatedStationDTO.setStationLocation(updatedStation.getStationLocation());
        updatedStationDTO.setStationContact(updatedStation.getStationContact());

        return updatedStationDTO;
    }



    @Override
    public String deleteFuelStation(String stationName) throws FuelStationException {
        // Check if the fuel station exists
        FuelStation existingStation = fuelStationRepository.findOneByStationName(stationName)
                .orElseThrow(() -> new FuelStationException("Fuel station not found with name : " + stationName));

        // Delete the station
        fuelStationRepository.delete(existingStation);

        // Return success message
        return "Fuel station '" + stationName + "' deleted successfully.";
    }

    @Override
    public String deleteFuelStation(int stationID) throws FuelStationException {

        // Check if the fuel station exists
        fuelStationRepository.findStationById(stationID)
                .orElseThrow(() -> new FuelStationException("Fuel station not found with stationID : " + stationID));

        // Delete the station
        fuelStationRepository.deleteByStationID(stationID);

        // Return success message
        return "Fuel station with ID '" + stationID + "' deleted successfully.";
    }

}
