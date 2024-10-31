package com.ssafy.bbogle.activity.controller;

import com.ssafy.bbogle.activity.dto.request.ActivityCreateRequest;
import com.ssafy.bbogle.activity.dto.request.ActivitySearchCondRequest;
import com.ssafy.bbogle.activity.dto.response.ActivityListResponse;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    @Operation(summary = "경험 수동 등록", description = "keywords는 키워드 ID를 담은 리스트로 요청<br>"
        + "ID는 모두 Integer")
    @PostMapping()
    public ResponseEntity<String> createActivity(@RequestBody ActivityCreateRequest request) {
        return null;
    }

    @Operation(summary = "내 경험 전체 조회", description = "요청 : word는 검색어, keywords는 키워드 ID를 담은 리스트, projects는 프로젝트 ID를 담은 리스트<br>"
        + "ID는 모두 Integer<br>"
        + "응답 : keywords 정보중 type은 0이면 기술, 1이면 인성 태그")
    @PostMapping("/search")
    public ResponseEntity<ActivityListResponse> searchActivity(@RequestBody ActivitySearchCondRequest request) {
        return null;
    }

}
