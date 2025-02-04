package com.example.Back_End.Repository;

import com.example.Back_End.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Integer> {

    // Method to find admin by email
    Optional<Admin> findByEmail(String email);

    // Method to find admin by email and password
    @Query(value = "SELECT * FROM admin WHERE email = ?1 AND password = ?2", nativeQuery = true)
    Optional<Admin> findOneByEmailAndPassword(String email, String password);
}
