package net.bluemaple.knowledgesharingcommunity.service;

import net.bluemaple.knowledgesharingcommunity.pojo.UserInfo;

import java.util.List;

public interface FollowerService {
    void subscribe(int followerId, int targetId);
    void unsubscribe(int followerId, int targetId);
    boolean isSubscribe(int followerId, int targetId);
    int hasFollowers(int targetId);
    int hasTargets(int followerId);
    List<UserInfo> getFollowerList(int targetId);
    List<UserInfo> getTargetList(int followerId);
}
