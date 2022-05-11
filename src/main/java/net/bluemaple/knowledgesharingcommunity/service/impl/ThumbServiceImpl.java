package net.bluemaple.knowledgesharingcommunity.service.impl;

import net.bluemaple.knowledgesharingcommunity.mapper.ThumbRelationshipMapper;
import net.bluemaple.knowledgesharingcommunity.mapper.UserMapper;
import net.bluemaple.knowledgesharingcommunity.service.ThumbService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;

@Service
public class ThumbServiceImpl implements ThumbService {
    @Resource
    private ThumbRelationshipMapper thumbRelationshipMapper;
    @Resource
    private UserMapper userMapper;
    @Override
    @Transactional
    public void thumb(int articleId, int userId) {
       thumbRelationshipMapper.addRecord(articleId,userId);
       userMapper.addContributionByArticleId(2,articleId);
    }

    @Override
    @Transactional
    public void cancelThumb(int articleId, int userId) {
        thumbRelationshipMapper.removeRecord(articleId,userId);
        userMapper.subtractContributionByArticleId(2,articleId);
    }


    @Override
    public boolean isThumbed(int articleId, int userId) {
        return thumbRelationshipMapper.hasRecord(articleId,userId);
    }

    @Override
    public int hasThumbs(int articleId) {
        return thumbRelationshipMapper.countRecord(articleId);
    }
}
