package net.bluemaple.knowledgesharingcommunity.service.impl;

import net.bluemaple.knowledgesharingcommunity.mapper.CollectionRelationshipMapper;
import net.bluemaple.knowledgesharingcommunity.mapper.UserMapper;
import net.bluemaple.knowledgesharingcommunity.pojo.ArticleInfo;
import net.bluemaple.knowledgesharingcommunity.service.CollectionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
@Service
public class CollectionServiceImpl implements CollectionService {
    @Resource
    private CollectionRelationshipMapper collectionRelationshipMapper;
    @Resource
    private UserMapper userMapper;
    @Override
    @Transactional
    public void addCollection(int articleId, int userId) {
        collectionRelationshipMapper.addRecord(articleId,userId);
        userMapper.addContributionByArticleId(5,articleId);
    }

    @Override
    @Transactional
    public void cancelCollection(int articleId, int userId) {
        collectionRelationshipMapper.removeRecord(articleId,userId);
        userMapper.subtractContributionByArticleId(5,articleId);
    }
    

    @Override
    public boolean isCollected(int articleId, int userId) {
        return collectionRelationshipMapper.hasRecord(articleId,userId);
    }

    @Override
    public int hasCollections(int articleId) {
        return collectionRelationshipMapper.countRecord(articleId);
    }

    @Override
    public List<ArticleInfo> getCollectionsByUserId(int userId) {
        return collectionRelationshipMapper.listAllCollectionsByUserId(userId);
    }
}
