package net.bluemaple.knowledgesharingcommunity.mapper;

import net.bluemaple.knowledgesharingcommunity.pojo.ArticleInfo;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface CollectionRelationshipMapper {
    int addRecord(@Param("articleId") int articleId,@Param("userId") int userId);
    int removeRecord(@Param("articleId") int articleId,@Param("userId") int userId);
    int removeAllRecordByArticleId(int articleId);
    boolean hasRecord(@Param("articleId") int articleId,@Param("userId") int userId);
    int countRecord(int articleId);
    List<ArticleInfo> listAllCollectionsByUserId(int userId);
}
