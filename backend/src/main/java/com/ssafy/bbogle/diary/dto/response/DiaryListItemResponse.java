package com.ssafy.bbogle.diary.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(description = "특정 프로젝트의 개발일지 전체 조회 리스트 내 요소 응답 DTO")
public class DiaryListItemResponse {

    @Schema(description = "개발일지 AI 한줄요약")
    private String summary;

    @Schema(description = "작성날짜")
    private LocalDate createDate;

}
