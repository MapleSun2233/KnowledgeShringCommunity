package net.bluemaple.knowledgesharingcommunity.service.impl;

import net.bluemaple.knowledgesharingcommunity.mapper.*;
import net.bluemaple.knowledgesharingcommunity.pojo.Article;
import net.bluemaple.knowledgesharingcommunity.pojo.ArticleInfo;
import net.bluemaple.knowledgesharingcommunity.pojo.Comment;
import net.bluemaple.knowledgesharingcommunity.pojo.User;
import net.bluemaple.knowledgesharingcommunity.service.ArticleService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;


@Service
public class ArticleServiceImpl implements ArticleService {
    @Resource
    private ArticleMapper articleMapper;
    @Resource
    private ThumbRelationshipMapper thumbRelationshipMapper;
    @Resource
    private CollectionRelationshipMapper collectionRelationshipMapper;
    @Resource
    private UserMapper userMapper;

    @Override
    @Transactional
    public int postArticle(String headline, String tags, String content, User publisher) {
        Article article = new Article();
        article.setHeadline(headline);
        article.setTags(tags);
        article.setContent(content);
        article.setPublisher(publisher);
        articleMapper.postArticle(article);
        userMapper.addContributionById(10,publisher.getId());
        return article.getId();
    }

    @Override
    @Transactional
    public Article getArticleById(int id) {
        articleMapper.addViewsByArticleId(id);
        return articleMapper.getArticleById(id);
    }

    @Override
    public List<ArticleInfo> getMyArticleList(int id) {
        return articleMapper.getMyArticleList(id);
    }

    @Override
    @Transactional
    public void removeArticleById(int articleId, int userId) {
        thumbRelationshipMapper.removeAllRecordByArticleId(articleId);
        collectionRelationshipMapper.removeAllRecordByArticleId(articleId);
        articleMapper.removeAllRecordByArticleId(articleId);
        articleMapper.removeArticleById(articleId);
        userMapper.subtractContributionById(10,userId);
    }

    @Override
    public int getAuthorIdByArticleId(int id) {
        return articleMapper.getAuthorIdByArticleId(id);
    }

    @Override
    public List<Comment> getComments(int id) {
        return articleMapper.getAllCommentsForThisArticle(id);
    }

    @Override
    @Transactional
    public void postComment(int userId, int articleId, String content) {
        articleMapper.addComment(userId, articleId, content);
    }

    @Override
    public List<ArticleInfo> getAPageArticleListByNew(int page) {
        return articleMapper.getAPageArticleListByNew(page*10);
    }

    @Override
    public List<ArticleInfo> getAPageArticleListByViews(int page) {
        return articleMapper.getAPageArticleListByViews(page*10);
    }

    @Override
    public List<ArticleInfo> getAPageArticleListByFollow(int page, int id) {
        return articleMapper.getAPageArticleListByFollow(page*10,id);
    }

    @Override
    public List<ArticleInfo> queryArticleByKeywords(String keywords) {
        String exp = String.join("|",keywords.split("\\s+"));
        return articleMapper.queryByKeywords(exp);
    }
}
