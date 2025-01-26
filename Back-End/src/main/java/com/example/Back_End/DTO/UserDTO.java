package com.example.Back_End.DTO;

import lombok.Data;

@Data
public class UserDTO {

    private int userId;
    private String userName;
    private String password;
    private String email;
    private String phone;
    private String role;

}
