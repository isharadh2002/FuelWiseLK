package com.example.Back_End.Repository;


import com.example.Back_End.Entity.VehicleOwner;


import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface VehicleOwnerRepository extends JpaRepository<VehicleOwner, Integer> {

    Optional<VehicleOwner> findByEmail(String ownerEmail);

    Optional<VehicleOwner> findOneByEmailAndPassword(String ownerEmail, String ownerPassword);
}
