package com.ssafy.bbogle.auth.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.bbogle.common.jwt.JwtUtil;
import com.ssafy.bbogle.common.util.RedisUtil;
import com.ssafy.bbogle.user.entity.User;
import com.ssafy.bbogle.user.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final RedisUtil redisUtil;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        // 카카오에서 받아온 사용자 정보 중 필요한 정보 추출
        Map<String, Object> attributes = oAuth2User.getAttributes();
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");

        Long kakaoId = (Long) attributes.get("id");
        String nickname = (String) profile.get("nickname");
        String email = (String) kakaoAccount.get("email");

        // DB에 User 저장
        User user = userRepository.findByKakaoId(kakaoId)
            .orElseGet(()-> User.builder()
                .kakaoId(kakaoId)
                .nickname(nickname)
                .email(email)
                .build());
        userRepository.save(user);

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
        HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getResponse();
        response.addCookie(cookie);

        // 액세스 토큰
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        Map<String, String> accessTokenMap = Map.of("accessToken", accessToken);
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            objectMapper.writeValue(response.getWriter(), accessTokenMap);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return oAuth2User;
    }

}
