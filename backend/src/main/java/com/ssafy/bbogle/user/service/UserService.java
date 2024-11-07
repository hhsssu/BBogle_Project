package com.ssafy.bbogle.user.service;

import com.ssafy.bbogle.user.dto.response.UserNicknameResponse;
import jakarta.servlet.http.HttpServletResponse;

public interface UserService {

    UserNicknameResponse getUserNickname();

    void logout(HttpServletResponse response);
}
