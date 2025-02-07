package com.example.Back_End.Repository;

import com.example.Back_End.Entity.FuelStation;
import com.example.Back_End.Entity.FuelTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FuelTransactionRepository extends JpaRepository<FuelTransaction, Integer> {
    // Custom queries can be added here if needed

    List<FuelTransaction> findAllByFuelStation(FuelStation fuelStation);
}