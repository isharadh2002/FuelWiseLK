package com.example.Back_End.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // Disable CSRF if required
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/v1/VehicleOwner/save/**").permitAll()
                        .requestMatchers("/api/v1/VehicleOwner/login/**").permitAll()
                        .requestMatchers("/api/v1/VehicleOwner/getOwnerID/**").permitAll()

                        .requestMatchers("/api/v1/FuelStation/**").permitAll()
                        .requestMatchers("/api/v1/FuelStation").permitAll()

                        .requestMatchers("/api/v1/FuelQuota/**").permitAll()
                        .requestMatchers("/api/v1/FuelQuota/updateFuelQuota/**").permitAll()

                        .requestMatchers("/api/v1/User/**").permitAll()
                        .requestMatchers("/api/v1/User").permitAll()

                        .requestMatchers("/api/v1/qr/generate/**").permitAll()
                        .requestMatchers("/api/v1/qr/**").permitAll()

                        .requestMatchers("/api/v1/vehicles").permitAll()
                        .requestMatchers("/api/v1/vehicles/**").permitAll()
                        .requestMatchers("/api/v1/vehicles/update-fuel-quota/**").permitAll()
                        .requestMatchers("/api/v1/vehicles/add").permitAll()

                        .requestMatchers("/api/v1/VehicleForm/addVehicle/**").permitAll()
                        .requestMatchers("/api/v1/VehicleForm/getAllVehicles/**").permitAll()
                        .requestMatchers("/api/v1/VehicleForm/updateVehicle/**").permitAll()
                        .requestMatchers("/api/v1/VehicleForm/deleteData/**").permitAll()

                        .requestMatchers("/api/v1/admins/**").permitAll()
                        .requestMatchers("/api/v1/admins").permitAll()

                        .anyRequest().authenticated()  // All other endpoints require authentication
                );

        return http.build();  // Return the SecurityFilterChain
    }
}
