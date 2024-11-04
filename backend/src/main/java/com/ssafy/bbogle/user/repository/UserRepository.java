package com.ssafy.bbogle.user.repository;

import com.ssafy.bbogle.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByKakaoId(Long kakaoId);

}
