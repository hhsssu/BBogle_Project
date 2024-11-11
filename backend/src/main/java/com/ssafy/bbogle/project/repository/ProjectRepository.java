package com.ssafy.bbogle.project.repository;

import com.ssafy.bbogle.project.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

    Optional<Project> findById(Integer id);

    List<Project> findByUser_KakaoId(Long kakaoId);

    Optional<Project> findByIdAndUser_KakaoId(Integer id, Long kakaoId);

    List<Project> findByUser_KakaoIdAndStatus(Long kakaoId, boolean status);
}
