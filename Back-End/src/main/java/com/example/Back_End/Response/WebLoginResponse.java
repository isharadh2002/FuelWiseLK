package com.example.Back_End.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WebLoginResponse {

    private int userId;
    private String role;
    private String message;
    private boolean success;

}
