package com.example.Back_End.Repository;


import com.example.Back_End.Entity.User;
import com.example.Back_End.Entity.VehicleOwner;


import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

@Repository
public interface VehicleOwnerRepository extends JpaRepository<VehicleOwner, Integer> {

    Optional<VehicleOwner> findByEmail(String email);

    Optional<VehicleOwner> findOneByEmailAndPassword(String email, String password);

    Optional<VehicleOwner> findOneByUser(User user);
}
