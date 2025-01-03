package com.example.Back_End.Exceptions;

public class FuelStationException extends Exception {

    public FuelStationException(String s) {

        super(s);
    }

    public FuelStationException(String message, Throwable cause) {
        super(message, cause);
    }
}
