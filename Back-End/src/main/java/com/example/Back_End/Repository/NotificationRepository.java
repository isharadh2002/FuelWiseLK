package com.example.Back_End.Repository;

import com.example.Back_End.Entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {

//    List<Notification> findByUserId(Long userId);

}

