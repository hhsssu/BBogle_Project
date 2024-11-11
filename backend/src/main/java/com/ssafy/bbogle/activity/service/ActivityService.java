package com.ssafy.bbogle.activity.service;

import com.ssafy.bbogle.activity.dto.request.ActivitySearchCondRequest;
import com.ssafy.bbogle.activity.dto.request.ActivityUserCreateRequest;
import com.ssafy.bbogle.activity.dto.response.ActivityListResponse;

public interface ActivityService {

    void createActivity(ActivityUserCreateRequest request);

    ActivityListResponse searchActivity(ActivitySearchCondRequest request);
}
