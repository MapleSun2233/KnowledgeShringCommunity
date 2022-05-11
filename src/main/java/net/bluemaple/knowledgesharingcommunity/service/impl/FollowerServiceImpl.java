package net.bluemaple.knowledgesharingcommunity.service.impl;

import net.bluemaple.knowledgesharingcommunity.mapper.FollowerRelationshipMapper;
import net.bluemaple.knowledgesharingcommunity.pojo.UserInfo;
import net.bluemaple.knowledgesharingcommunity.service.FollowerService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
@Service
public class FollowerServiceImpl implements FollowerService {
    @Resource
    private FollowerRelationshipMapper mapper;
    @Override
    @Transactional
    public void subscribe(int followerId, int targetId) {
        mapper.addRecord(followerId,targetId);
    }

    @Override
    @Transactional
    public void unsubscribe(int followerId, int targetId) {
        mapper.removeRecord(followerId,targetId);
    }

    @Override
    public boolean isSubscribe(int followerId, int targetId) {
        return mapper.hasRecord(followerId,targetId);
    }

    @Override
    public int hasFollowers(int targetId) {
        return mapper.countFollowers(targetId);
    }

    @Override
    public int hasTargets(int followerId) {
        return mapper.countTargets(followerId);
    }

    @Override
    public List<UserInfo> getFollowerList(int targetId) {
        return mapper.getFollowerList(targetId);
    }

    @Override
    public List<UserInfo> getTargetList(int followerId) {
        return mapper.getTargetList(followerId);
    }
}
