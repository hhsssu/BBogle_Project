package com.ssafy.bbogle.activity.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDate;
import java.util.List;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@Schema(description = "경험 등록 요청 ")
public class ActivityCreateRequest {

    @Schema(description = "소제목")
    private String title;

    @Schema(description = "내용")
    private String content;

    @Schema(description = "시작날짜")
    private LocalDate startDate;

    @Schema(description = "마감날짜")
    private LocalDate endDate;

    @Schema(description = "키워드ID 리스트")
    private List<Integer> keywords;
}
