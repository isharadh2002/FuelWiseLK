package com.example.Back_End.Services.Impl;

import com.example.Back_End.DTO.FuelStationDTO;
import com.example.Back_End.Entity.FuelStation;
import com.example.Back_End.Exceptions.FuelStationException;
import com.example.Back_End.Repository.FuelStationRepository;
import com.example.Back_End.Services.FuelStationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import java.util.List;

@Service
public class FuelStationServiceIMPL implements FuelStationService {

    @Autowired
    private FuelStationRepository fuelStationRepository;


    @Override
    public String addFuelStation(FuelStationDTO fuelStationDTO) {

        //Create a FuelStation instance using the DTO values
        FuelStation fuelStation = new FuelStation();
        fuelStation.setStationName(fuelStationDTO.getStationName());
        fuelStation.setStationLocation(fuelStationDTO.getStationLocation());
        fuelStation.setStationContact(fuelStationDTO.getStationContact());

        //Save the FuelStation instance to the database
        fuelStationRepository.save(fuelStation);
        return "Fuel Station added successfully";

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

    public List<FuelStationDTO> getAllFuelStations() {

        List<FuelStation> fuelStationList = fuelStationRepository.findAll();

        return modelMapper.map(fuelStationList, new TypeToken<List<FuelStation>>(){}.getType());
    }

    @Override
    public FuelStationDTO updateFuelStation(FuelStationDTO fuelStationDTO) {
        return null;
    }

    @Override
    public String deleteFuelStation(String stationName) {
        return null;
    }
    
}
