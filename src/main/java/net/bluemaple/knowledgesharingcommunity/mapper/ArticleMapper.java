package net.bluemaple.knowledgesharingcommunity.mapper;

import net.bluemaple.knowledgesharingcommunity.pojo.Article;
import net.bluemaple.knowledgesharingcommunity.pojo.ArticleInfo;
import net.bluemaple.knowledgesharingcommunity.pojo.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ArticleMapper {
    int postArticle(Article article);
    Article getArticleById(int id);
    List<ArticleInfo> getMyArticleList(int id);
    int addViewsByArticleId(int id);
    int removeArticleById(int id);
    int getAuthorIdByArticleId(int id);
    List<ArticleInfo> getAPageArticleListByNew(int page);
    List<ArticleInfo> getAPageArticleListByViews(int page);
    List<ArticleInfo> getAPageArticleListByFollow(@Param("page") int page, @Param("userId") int userId);
    int addComment(@Param("userId") int userId,@Param("articleId")  int articleId,@Param("content")  String content);
    List<Comment> getAllCommentsForThisArticle(int id);
    int removeAllRecordByArticleId(int id);
    List<ArticleInfo> queryByKeywords(String exp);
}
