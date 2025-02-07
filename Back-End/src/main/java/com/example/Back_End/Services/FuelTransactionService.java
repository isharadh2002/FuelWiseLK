package com.example.Back_End.Services;

import com.example.Back_End.DTO.FuelTransactionDTO;
import com.example.Back_End.Exceptions.FuelTransactionException;

import java.util.List;

public interface FuelTransactionService {
    List<FuelTransactionDTO> retrieveFuelTransactionsByStationID(int id) throws FuelTransactionException;
}
