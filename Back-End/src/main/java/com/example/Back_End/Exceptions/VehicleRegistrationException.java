package com.example.Back_End.Exceptions;

public class VehicleRegistrationException extends RuntimeException {
    public VehicleRegistrationException(String s) {

        super(s);
    }

    public VehicleRegistrationException(String message, Throwable cause) {
        super(message, cause);
    }
}
