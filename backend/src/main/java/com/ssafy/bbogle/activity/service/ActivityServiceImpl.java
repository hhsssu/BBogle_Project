package com.ssafy.bbogle.activity.service;

import com.ssafy.bbogle.activity.dto.request.ActivitySearchCondRequest;
import com.ssafy.bbogle.activity.dto.request.ActivityUserCreateRequest;
import com.ssafy.bbogle.activity.dto.response.ActivityListItemResponse;
import com.ssafy.bbogle.activity.dto.response.ActivityListResponse;
import com.ssafy.bbogle.activity.entity.Activity;
import com.ssafy.bbogle.activity.entity.ActivityKeyword;
import com.ssafy.bbogle.activity.repository.ActivityKeywordRepository;
import com.ssafy.bbogle.activity.repository.ActivityRepository;
import com.ssafy.bbogle.common.exception.CustomException;
import com.ssafy.bbogle.common.exception.ErrorCode;
import com.ssafy.bbogle.common.util.LoginUser;
import com.ssafy.bbogle.keyword.entity.Keyword;
import com.ssafy.bbogle.keyword.repository.KeywordRepository;
import com.ssafy.bbogle.project.entity.Project;
import com.ssafy.bbogle.project.repository.ProjectRepository;
import com.ssafy.bbogle.user.entity.User;
import com.ssafy.bbogle.user.repository.UserRepository;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService {

    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ActivityRepository activityRepository;
    private final KeywordRepository keywordRepository;
    private final ActivityKeywordRepository activityKeywordRepository;

    @Override
    @Transactional
    public void createActivity(ActivityUserCreateRequest request) {
        Long kakaoId = LoginUser.getKakaoId();
        User user = userRepository.findByKakaoId(kakaoId)
            .orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));

        Project project = null;

        if(request.getProjectId() != null){
            project = projectRepository.findById(request.getProjectId())
                .orElseThrow(()->new CustomException(ErrorCode.PROJECT_NOT_FOUND));
        }

        Activity activity = Activity.builder()
            .title(request.getTitle())
            .content(request.getContent())
            .createDate(LocalDate.now())
            .startDate(request.getStartDate())
            .endDate(request.getEndDate())
            .project(project)
            .user(user)
            .build();

        Activity savedActivity = activityRepository.save(activity);

        for(int keywordId : request.getKeywords()){
            Keyword keyword = keywordRepository.findById(keywordId)
                .orElseThrow(()->new CustomException(ErrorCode.KEYWORD_NOT_FOUND));

            ActivityKeyword activityKeyword = ActivityKeyword.addActivityKeyword(savedActivity, keyword);
            activityKeywordRepository.save(activityKeyword);
        }
    }

    @Override
    public ActivityListResponse searchActivity(ActivitySearchCondRequest request) {

        Long kakaoId = LoginUser.getKakaoId();
        User user = userRepository.findByKakaoId(kakaoId)
            .orElseThrow(()->new CustomException(ErrorCode.USER_NOT_FOUND));

        List<ActivityListItemResponse> result = activityRepository.getActivityList(user, request);
        return null;
    }
}
