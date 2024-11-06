package com.ssafy.bbogle.user.service;

import com.ssafy.bbogle.common.util.LoginUser;
import com.ssafy.bbogle.user.dto.response.UserNicknameResponse;
import com.ssafy.bbogle.user.entity.User;
import com.ssafy.bbogle.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public UserNicknameResponse getUserNickname() {
        Long kakaoId = LoginUser.getKakaoId();
        User user = userRepository.findByKakaoId(kakaoId)
            .orElseThrow(RuntimeException::new);
        return UserNicknameResponse.builder()
            .nickname(user.getNickname())
            .build();
    }
}
