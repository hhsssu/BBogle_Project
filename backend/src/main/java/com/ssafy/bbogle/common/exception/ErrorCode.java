package com.ssafy.bbogle.common.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

//    에러이름 ( HttpStatus코드 , 메세지 ),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 유저를 찾을 수 없습니다.")
    ;

    private final HttpStatus status;
    private final String message;

}
