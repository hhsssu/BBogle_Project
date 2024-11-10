package com.ssafy.bbogle.diary.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "개발일지 수정 요청 DTO")
public class DiaryUpdateRequest {

    @Schema(description = "AI 요약 제목")
    private String title;

    @Schema(description = "답변")
    private List<String> answers;

    @Schema(description = "첨부 이미지")
    private List<String> images;

}
