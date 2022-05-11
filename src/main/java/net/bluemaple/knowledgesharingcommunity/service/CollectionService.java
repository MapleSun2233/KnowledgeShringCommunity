package net.bluemaple.knowledgesharingcommunity.service;

import net.bluemaple.knowledgesharingcommunity.pojo.ArticleInfo;

import java.util.List;

public interface CollectionService {
    void addCollection(int articleId, int userId);
    void cancelCollection(int articleId, int userId);
    boolean isCollected(int articleId, int userId);
    int hasCollections(int articleId);
    List<ArticleInfo> getCollectionsByUserId(int userId);
}
