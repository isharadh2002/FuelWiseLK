package com.example.Back_End.Repository;

import com.example.Back_End.Entity.FuelTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FuelTransactionRepository extends JpaRepository<FuelTransaction, Integer> {
    // Custom queries can be added here if needed
}