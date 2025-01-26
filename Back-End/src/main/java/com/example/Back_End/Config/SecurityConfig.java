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
                        .requestMatchers("/api/v1/FuelStation/save/**").permitAll()
                        .requestMatchers("/api/v1/FuelStation/getStations/**").permitAll()
                        .requestMatchers("/api/v1/FuelStation/get/**").permitAll()
                        .requestMatchers("/api/v1/FuelStation/update/**").permitAll()
                        .requestMatchers("/api/v1/FuelStation/delete/**").permitAll()
                        .requestMatchers("/api/v1/FuelQuota/**").permitAll()

                        .requestMatchers("/api/v1/User/save/**").permitAll()
                        .requestMatchers("/api/v1/User/login/**").permitAll()
                        .requestMatchers("/api/v1/User/RegMobileUser/**").permitAll()
                        .requestMatchers("/api/v1/User/loginMobileUser/**").permitAll()

                        .requestMatchers("/api/v1/qr/generate/**").permitAll()
                        .requestMatchers("/api/v1/qr/**").permitAll()

                        .requestMatchers("/api/v1/vehicles").permitAll()
                        .requestMatchers("/api/v1/vehicles/**").permitAll()

                        .anyRequest().authenticated()  // All other endpoints require authentication
                );

        return http.build();  // Return the SecurityFilterChain
    }
}
