package net.bluemaple.knowledgesharingcommunity.service;


import net.bluemaple.knowledgesharingcommunity.pojo.Article;
import net.bluemaple.knowledgesharingcommunity.pojo.ArticleInfo;
import net.bluemaple.knowledgesharingcommunity.pojo.Comment;
import net.bluemaple.knowledgesharingcommunity.pojo.User;

import java.util.List;


/**
 * 文章相关操作
 */
public interface ArticleService {
    int postArticle(String headline, String tags, String content, User publisher);
    Article getArticleById(int id);
    List<ArticleInfo> getMyArticleList(int id);
    void removeArticleById(int articleId, int userId);
    int getAuthorIdByArticleId(int id);
    List<Comment> getComments(int id);
    void postComment(int userId, int articleId, String content);
    List<ArticleInfo> getAPageArticleListByNew(int page);
    List<ArticleInfo> getAPageArticleListByViews(int page);
    List<ArticleInfo> getAPageArticleListByFollow(int page, int id);
    List<ArticleInfo> queryArticleByKeywords(String keywords);
}
