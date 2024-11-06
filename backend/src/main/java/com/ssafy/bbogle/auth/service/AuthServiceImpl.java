package com.ssafy.bbogle.auth.service;

import com.ssafy.bbogle.auth.dto.response.NewTokenResponse;
import com.ssafy.bbogle.common.jwt.JwtUtil;
import com.ssafy.bbogle.common.util.RedisUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {


    private final JwtUtil jwtUtil;
    private final RedisUtil redisUtil;

    @Override
    public NewTokenResponse refreshToken(String refreshToken, HttpServletResponse response) {

        if(!jwtUtil.validateToken(refreshToken)){
            throw new IllegalArgumentException("Invalid refresh token");
        }

        String kakaoId = jwtUtil.getKakaoIdFromToken(refreshToken);

        if(!refreshToken.equals(redisUtil.get(kakaoId)) || redisUtil.get(kakaoId) == null){
            throw new IllegalArgumentException("Invalid refresh token");
        }

        String newAccessToken = jwtUtil.generateAccessToken(kakaoId);
        String newRefreshToken = jwtUtil.generateRefreshToken(kakaoId);

        // 새 리프레시로 교체
        redisUtil.saveRefresh(kakaoId, newRefreshToken, jwtUtil.getRefreshTokenExpire());

        Cookie refreshCookie = new Cookie("refreshToken", newRefreshToken);
        refreshCookie.setHttpOnly(true);
        refreshCookie.setPath("/");
        refreshCookie.setSecure(true);
        response.addCookie(refreshCookie);

        return NewTokenResponse.builder()
            .accessToken(newAccessToken)
            .build();
    }
}
