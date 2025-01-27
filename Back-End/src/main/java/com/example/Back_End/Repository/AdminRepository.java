package com.example.Back_End.Repository;

import com.example.Back_End.Entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {

    // Method to find admin by email
    Optional<Admin> findByEmail(String email);
}
