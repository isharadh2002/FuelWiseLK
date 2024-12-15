package com.example.Back_End.Entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@ToString(onlyExplicitlyIncluded = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generation of primary key
    @EqualsAndHashCode.Include // Primary key for equality
    private int notificationID;

    @Column(nullable = false) // Ensure not null
    @ToString.Include
    private String message;

    @Column(nullable = false, updatable = false) // Ensure not null and not editable after creation
    @ToString.Include
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "vehicle_id", nullable = false) // Foreign key in Notification table
    private Vehicle vehicle; // Owning side of the relationship

    @PrePersist
    protected void onCreate() {
        this.timestamp = LocalDateTime.now();
    }


}


