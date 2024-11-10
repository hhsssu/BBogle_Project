package com.ssafy.bbogle.project.service;

import com.ssafy.bbogle.project.dto.request.NotificationStatusRequest;
import com.ssafy.bbogle.project.dto.request.ProjectCreateRequest;
import com.ssafy.bbogle.project.dto.request.ProjectUpdateRequest;
import com.ssafy.bbogle.project.dto.response.ProjectListResponse;
import com.ssafy.bbogle.project.dto.response.ProjectDetailResponse;
import com.ssafy.bbogle.project.dto.response.ProjectListItemResponse;
import com.ssafy.bbogle.project.entity.Project;
import com.ssafy.bbogle.project.repository.ProjectRepository;
import com.ssafy.bbogle.summary.dto.request.SummaryRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProjectService {

    private static final Logger logger = LoggerFactory.getLogger(ProjectService.class);
    private final ProjectRepository projectRepository;

    @Autowired
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    // id 입력에 따른 조회 메서드 => 오류 투성이
    @Transactional
    public void createProject(ProjectCreateRequest request) {
        Project project = Project.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .memberCount(request.getMemberCount())
                .status(request.isNotificationStatus())
                .image(request.getImage())
                .build();
        projectRepository.save(project);
        logger.info("프로젝트가 성공적으로 생성되었습니다.");
    }

    public ProjectListResponse getAllProjects() {
        logger.info("전체 프로젝트 조회 요청을 받았습니다.");
        List<ProjectListItemResponse> projectList = projectRepository.findAll().stream()
                .map(project -> ProjectListItemResponse.builder()
                        .projectId(project.getId())
                        .title(project.getTitle())
                        .description(project.getDescription())
                        .image(project.getImage())
                        .status(project.isStatus())
                        .startDate(project.getStartDate())
                        .endDate(project.getEndDate())
                        .notificationStatus(project.isStatus())
                        .build())
                .collect(Collectors.toList());
        logger.info("전체 프로젝트 조회가 완료되었습니다.");
        return ProjectListResponse.builder().projectList(projectList).build();
    }

    public ProjectListResponse getInProgressProjects() {
        logger.info("진행 중인 프로젝트 조회 요청을 받았습니다.");
        List<ProjectListItemResponse> projectList = projectRepository.findAll().stream()
                .filter(Project::isStatus)
                .map(project -> ProjectListItemResponse.builder()
                        .projectId(project.getId())
                        .title(project.getTitle())
                        .description(project.getDescription())
                        .image(project.getImage())
                        .status(project.isStatus())
                        .startDate(project.getStartDate())
                        .endDate(project.getEndDate())
                        .notificationStatus(project.isStatus())
                        .build())
                .collect(Collectors.toList());
        logger.info("진행 중인 프로젝트 조회가 완료되었습니다.");
        return ProjectListResponse.builder().projectList(projectList).build();
    }

    public ProjectDetailResponse getProjectById(Integer projectId) {
        logger.info("프로젝트 상세 조회 요청을 받았습니다. projectId: {}", projectId);
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("해당 ID의 프로젝트를 찾을 수 없습니다: " + projectId));
        ProjectDetailResponse response = ProjectDetailResponse.builder()
                .projectId(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .image(project.getImage())
                .status(project.isStatus())
                .startDate(project.getStartDate())
                .endDate(project.getEndDate())
                .memberCount(project.getMemberCount())
                .role(project.getTags().stream().map(tag -> tag.getName()).collect(Collectors.toList()))
                .skill(project.getActivities().stream()
                        .map(activity -> activity.getTitle())
                        .collect(Collectors.toList()))
                .build();
        logger.info("프로젝트 상세 조회가 완료되었습니다. projectId: {}", projectId);
        return response;
    }

    @Transactional
    public void updateProject(Integer projectId, ProjectUpdateRequest request) {
        logger.info("프로젝트 수정 요청을 받았습니다. projectId: {}, 수정 내용: {}", projectId, request);
        Project existingProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("해당 ID의 프로젝트를 찾을 수 없습니다: " + projectId));

        Project updatedProject = Project.builder()  // Creating a new instance with updated data
                .id(existingProject.getId())
                .user(existingProject.getUser())
                .title(request.getTitle())
                .description(request.getDescription())
                .startDate(request.getStartDate())
                .endDate(request.getEndDate())
                .memberCount(request.getMemberCount())
                .status(request.isNotificationStatus())
                .image(request.getImage())
                .tags(existingProject.getTags())
                .diaries(existingProject.getDiaries())
                .activities(existingProject.getActivities())
                .build();

        projectRepository.save(updatedProject);
        logger.info("프로젝트가 성공적으로 수정되었습니다. projectId: {}", projectId);
    }

    @Transactional
    public void deleteProject(Integer projectId) {
        logger.info("프로젝트 삭제 요청을 받았습니다. projectId: {}", projectId);
        projectRepository.deleteById(projectId.longValue());
        logger.info("프로젝트가 성공적으로 삭제되었습니다. projectId: {}", projectId);
    }

    @Transactional
    public void endProject(Integer projectId, SummaryRequest request) {
        logger.info("프로젝트 종료 요청을 받았습니다. projectId: {}", projectId);
        Project existingProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("해당 ID의 프로젝트를 찾을 수 없습니다: " + projectId));

        Project updatedProject = Project.builder()  // Creating a new instance with status set to completed
                .id(existingProject.getId())
                .user(existingProject.getUser())
                .title(existingProject.getTitle())
                .description(existingProject.getDescription())
                .startDate(existingProject.getStartDate())
                .endDate(existingProject.getEndDate())
                .memberCount(existingProject.getMemberCount())
                .status(false)  // Set to completed
                .image(existingProject.getImage())
                .tags(existingProject.getTags())
                .diaries(existingProject.getDiaries())
                .activities(existingProject.getActivities())
                .build();

        projectRepository.save(updatedProject);
        logger.info("프로젝트가 성공적으로 종료되었습니다. projectId: {}", projectId);
    }

    @Transactional
    public void toggleNotificationStatus(Integer projectId, NotificationStatusRequest request) {
        logger.info("프로젝트 알림 상태 변경 요청을 받았습니다. projectId: {}, 알림 상태: {}", projectId, request);
        Project existingProject = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("해당 ID의 프로젝트를 찾을 수 없습니다: " + projectId));

        Project updatedProject = Project.builder()
                .id(existingProject.getId())
                .user(existingProject.getUser())
                .title(existingProject.getTitle())
                .description(existingProject.getDescription())
                .startDate(existingProject.getStartDate())
                .endDate(existingProject.getEndDate())
                .memberCount(existingProject.getMemberCount())
                .status(request.isStatus())
                .image(existingProject.getImage())
                .tags(existingProject.getTags())
                .diaries(existingProject.getDiaries())
                .activities(existingProject.getActivities())
                .build();

        projectRepository.save(updatedProject);
        logger.info("프로젝트 알림 상태가 성공적으로 변경되었습니다. projectId: {}", projectId);
    }
}
