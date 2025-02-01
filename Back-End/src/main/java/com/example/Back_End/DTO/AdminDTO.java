package com.example.Back_End.DTO;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
public class AdminDTO {

    private Long adminID;

    @NotNull(message = "Admin name cannot be null")  // Validation for non-null adminName
    private String adminName;

    @NotNull(message = "Email cannot be null")  // Validation for non-null email
    @Email(message = "Email should be valid")  // Validation for valid email format
    private String email;

    private String password;


}
