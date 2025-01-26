package com.example.Back_End.Services.Impl;
import com.example.Back_End.Services.NotificationService;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.stereotype.Service;

@Service
public class NotificationServiceIMPL implements NotificationService {

//    private static final String ACCOUNT_SID = "AC80b0758b5925d6ba820de3844e0a8e93";
//    private static final String AUTH_TOKEN = "61272f3c952505f5a587d75a6e7c18c3";
//    private static final String TWILIO_PHONE_NUMBER = "+18782256081";

    private static final String ACCOUNT_SID = System.getenv("TWILIO_ACCOUNT_SID");
    private static final String AUTH_TOKEN = System.getenv("TWILIO_AUTH_TOKEN");
    private static final String TWILIO_PHONE_NUMBER = System.getenv("TWILIO_PHONE_NUMBER");


    static {
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
    }



    public void sendSms(String phoneNumber, String message) {
        Message.creator(
                new com.twilio.type.PhoneNumber(phoneNumber),
                new com.twilio.type.PhoneNumber(TWILIO_PHONE_NUMBER),
                message
        ).create();
    }
}
