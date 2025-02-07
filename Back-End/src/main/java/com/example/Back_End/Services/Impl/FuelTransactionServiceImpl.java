package com.example.Back_End.Services.Impl;

import com.example.Back_End.DTO.FuelTransactionDTO;
import com.example.Back_End.Entity.FuelStation;
import com.example.Back_End.Entity.FuelTransaction;
import com.example.Back_End.Exceptions.FuelTransactionException;
import com.example.Back_End.Repository.FuelStationRepository;
import com.example.Back_End.Repository.FuelTransactionRepository;
import com.example.Back_End.Services.FuelTransactionService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FuelTransactionServiceImpl implements FuelTransactionService {
    @Autowired
    FuelTransactionRepository fuelTransactionRepository;

    @Autowired
    FuelStationRepository fuelStationRepository;

    @Autowired
    ModelMapper modelMapper;

    @Override
    public List<FuelTransactionDTO> retrieveFuelTransactionsByStationID(int id) throws FuelTransactionException {
        Optional<FuelStation> fuelStationOptional = fuelStationRepository.findById(id);

        if (fuelStationOptional.isPresent()) {
            FuelStation fuelStation = fuelStationOptional.get();

            List<FuelTransaction> fuelTransactionList = fuelTransactionRepository.findAllByFuelStation(fuelStation);
            List<FuelTransactionDTO> fuelTransactionDTOList = new ArrayList<>();

            for (FuelTransaction fuelTransaction : fuelTransactionList) {
                FuelTransactionDTO fuelTransactionDTO = modelMapper.map(fuelTransaction, FuelTransactionDTO.class);
                fuelTransactionDTO.setVehicleID(fuelTransaction.getVehicle().getVehicleId());
                fuelTransactionDTO.setStationID(fuelTransaction.getFuelStation().getStationID());
                fuelTransactionDTOList.add(fuelTransactionDTO);
            }
            return fuelTransactionDTOList;
        } else {
            throw new FuelTransactionException("Fuel Station not found with ID: " + id);
        }
    }
}
