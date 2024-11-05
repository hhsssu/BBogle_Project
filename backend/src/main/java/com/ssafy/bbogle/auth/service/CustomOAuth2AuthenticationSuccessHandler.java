package com.ssafy.bbogle.auth.service;

import com.ssafy.bbogle.common.jwt.JwtUtil;
import com.ssafy.bbogle.common.util.RedisUtil;
import com.ssafy.bbogle.user.entity.User;
import com.ssafy.bbogle.user.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
@RequiredArgsConstructor
public class CustomOAuth2AuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final RedisUtil redisUtil;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        Map<String, Object> attributes = oAuth2User.getAttributes();
        Long kakaoId = (Long) attributes.get("id");
        User user = userRepository.findByKakaoId(kakaoId).orElseThrow();

        // 토큰 발급
        String accessToken = jwtUtil.generateAccessToken(user.getKakaoId().toString());
        String refreshToken = jwtUtil.generateRefreshToken(user.getKakaoId().toString());

        // 리프레시 토큰 저장
        redisUtil.save(user.getKakaoId().toString(), refreshToken, jwtUtil.getRefreshTokenExpire());

        Cookie cookie = new Cookie("refreshToken", refreshToken);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setMaxAge((int)jwtUtil.getRefreshTokenExpire()/1000);
        response.addCookie(cookie);

//        response.setContentType("application/json");
//        response.setCharacterEncoding("utf-8");
//        response.getWriter().write("{\"accessToken\":\"" + accessToken + "\"}");

//        // Access Token을 쿼리 파라미터로 전달하여 리다이렉트
//        String redirectUrl = "http://localhost:5173/main?accessToken=" + accessToken;
//        response.sendRedirect(redirectUrl); // 리다이렉트 수행

        // Access Token을 헤더에 추가
        response.setHeader("Authorization", "Bearer " + accessToken);

        // 리다이렉트 수행
        response.sendRedirect("http://localhost:5173/main");
    }
}
