package com.ssafy.bbogle.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

//    에러이름 ( HttpStatus코드 , 메세지 ),

    // 404
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 유저를 찾을 수 없습니다."),
    PROJECT_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 프로젝트를 찾을 수 없습니다."),
    SUMMARY_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 회고를 찾을 수 없습니다."),
    NOTIFICATION_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 알림 설정을 찾을 수 없습니다."),

    // 403
    UNAUTHORIZED_ACCESS_EXCEPTION(HttpStatus.FORBIDDEN, "접근 권한이 없습니다.");

    private final HttpStatus status;
    private final String message;

}
