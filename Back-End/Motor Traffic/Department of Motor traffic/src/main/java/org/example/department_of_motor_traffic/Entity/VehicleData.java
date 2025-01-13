package org.example.department_of_motor_traffic.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class VehicleData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String licensePlate;

    @Column(nullable = false)
    private String vehicleModel;

    @Column(nullable = false)
    private String ownerName;

    @Column(nullable = false)
    private Date dateOfRegistration;
}
