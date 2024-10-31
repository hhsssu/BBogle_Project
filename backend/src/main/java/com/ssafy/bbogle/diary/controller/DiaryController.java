package com.ssafy.bbogle.diary.controller;

import com.ssafy.bbogle.diary.dto.request.DiaryCreateResponse;
import com.ssafy.bbogle.diary.dto.response.DiaryListResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.Parameters;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/projects")
@Tag(name = "DiaryController", description = "개발일지 컨트롤러")
public class DiaryController {

    @Operation(summary = "특정 프로젝트의 개발일지 목록 조회")
    @Parameters(value = {
        @Parameter(name = "projectId", description = "프로젝트 ID", in = ParameterIn.PATH)
    })
    @GetMapping("/{projectId}/diaries")
    public ResponseEntity<DiaryListResponse> getAllDiaries(@PathVariable("projectId") String projectId){
        return null;
    }

    @Operation(summary = "개발일지 등록")
    @Parameters(value = {
        @Parameter(name = "projectId", description = "프로젝트 ID", in = ParameterIn.PATH)
    })
    @PostMapping("/{projectId}/diaries")
    public ResponseEntity<String> createDiary(@PathVariable("projectId") String projectId,
        @RequestBody DiaryCreateResponse request){
        return null;
    }


}
