package com.example.Back_End.Controller;

import com.example.Back_End.DTO.NotificationDTO;
import com.example.Back_End.Services.FuelQuotaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin // Adjust allowed origins or methods as needed
@RequestMapping("api/v1/User")
public class NotificationController {

    @Autowired
    private FuelQuotaService fuelQuotaService;

//    @PostMapping("/update-quota")
//    public ResponseEntity<String> updateFuelQuota(@RequestBody NotificationDTO notificationDTO) {
//        try {
//            String response = fuelQuotaService.updateFuelQuota(notificationDTO.getVehicleId(), notificationDTO.getPumpedLiters());
//            return ResponseEntity.ok(response);
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
}
