package com.ssafy.bbogle.notification.repository;

import com.ssafy.bbogle.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {
    Optional<Notification> findByProject_Id(Integer projectId);
}
