package com.ssafy.bbogle.project.controller;

import com.ssafy.bbogle.project.dto.request.ProjectCreateRequest;
import com.ssafy.bbogle.project.dto.request.ProjectUpdateRequest;
import com.ssafy.bbogle.project.dto.response.AllProjectInfoResponse;
import com.ssafy.bbogle.project.dto.response.ProjectDetailInfoResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects")
@Tag(name = "ProjectController", description = "프로젝트 컨트롤러")
public class ProjectController {

    @Operation(summary = "프로젝트 생성",
        description = "role과 skill은 List<String> 형태로 요청<br>"
            + "알림은 꺼짐이 false(0), 켜짐이 true(1)<br>"
            + "알림 시간은 hour, minute 정보만 요청")
    @PostMapping()
    public ResponseEntity<String> createProject(ProjectCreateRequest request){
        return null;
    }

    @Operation(summary = "내 프로젝트 전체 조회",
        description = "status 1이 진행중, 0이 종료<br>"
            + "notificationStatus 1이 ON, 0이 OFF")
    @GetMapping()
    public ResponseEntity<AllProjectInfoResponse> getAllProject(){
        return null;
    }

    @Operation(summary = "프로젝트 상세 조회",
        description = "status 1이 진행중, 0이 종료")
    @Parameters(value = {
        @Parameter(name = "id", description = "프로젝트 ID", in = ParameterIn.PATH)
    })
    @GetMapping("/{id}")
    public ResponseEntity<ProjectDetailInfoResponse> getProjectById(@PathVariable("id") String id){
        return null;
    }

    @Operation(summary = "프로젝트 정보 수정",
        description = "role과 skill은 List<String> 형태로 요청<br>"
        + "알림은 꺼짐이 false(0), 켜짐이 true(1)<br>"
        + "알림 시간은 hour, minute 정보만 요청")
    @Parameters(value = {
        @Parameter(name = "id", description = "프로젝트 ID", in = ParameterIn.PATH)
    })
    @PatchMapping("/{id}")
    public ResponseEntity<String> updateProject(@PathVariable("id") String id, ProjectUpdateRequest request){
        return null;
    }

    @Operation(summary = "프로젝트 삭제")
    @Parameters(value = {
        @Parameter(name = "id", description = "프로젝트 ID", in = ParameterIn.PATH)
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProject(@PathVariable("id") String id){
        return null;
    }

}
