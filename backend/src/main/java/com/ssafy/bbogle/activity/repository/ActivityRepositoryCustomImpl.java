package com.ssafy.bbogle.activity.repository;

import com.ssafy.bbogle.activity.dto.request.ActivitySearchCondRequest;
import com.ssafy.bbogle.activity.dto.response.ActivityListItemResponse;
import com.ssafy.bbogle.keyword.entity.Keyword;
import com.ssafy.bbogle.user.entity.User;
import java.util.List;
import org.springframework.stereotype.Repository;

@Repository
public class ActivityRepositoryCustomImpl implements ActivityRepositoryCustom {

    @Override
    public List<ActivityListItemResponse> getActivityList(User user,
        ActivitySearchCondRequest request) {

        String word = request.getWord();
        List<Integer> keywords = request.getKeywords();
        List<Integer> projects = request.getProjects();

        

        return List.of();
    }
}
