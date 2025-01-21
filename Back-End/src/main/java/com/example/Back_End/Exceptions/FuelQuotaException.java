package com.example.Back_End.Exceptions;

public class FuelQuotaException extends Exception {

    public FuelQuotaException(String s) {

        super(s);
    }

    public FuelQuotaException(String message, Throwable cause) {
        super(message, cause);
    }
}
