package com.ssafy.bbogle.user.service;

import com.ssafy.bbogle.common.exception.CustomException;
import com.ssafy.bbogle.common.exception.ErrorCode;
import com.ssafy.bbogle.common.util.LoginUser;
import com.ssafy.bbogle.common.util.RedisUtil;
import com.ssafy.bbogle.user.dto.response.UserNicknameResponse;
import com.ssafy.bbogle.user.entity.User;
import com.ssafy.bbogle.user.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final RedisUtil redisUtil;

    @Override
    public UserNicknameResponse getUserNickname() {
        Long kakaoId = LoginUser.getKakaoId();
        User user = userRepository.findByKakaoId(kakaoId)
            .orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));
        return UserNicknameResponse.builder()
            .nickname(user.getNickname())
            .build();
    }

    @Override
    public void logout(HttpServletResponse response) {

        redisUtil.delete(LoginUser.getKakaoId().toString());

        Cookie deleteCookie = new Cookie("refreshToken", null);
        deleteCookie.setMaxAge(0);
        deleteCookie.setPath("/");
        deleteCookie.setHttpOnly(true);
        deleteCookie.setSecure(true);
        response.addCookie(deleteCookie);

    }
}
