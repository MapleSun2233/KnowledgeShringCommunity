package net.bluemaple.knowledgesharingcommunity.mapper;

import org.apache.ibatis.annotations.*;

@Mapper
public interface ThumbRelationshipMapper {
    @Insert("insert into thumb_relationship (article_id,user_id) values (#{articleId},#{userId})")
    int addRecord(@Param("articleId") int articleId, @Param("userId") int userId);
    @Delete("delete from thumb_relationship where article_id = #{articleId} and user_id = #{userId}")
    int removeRecord(@Param("articleId") int articleId,@Param("userId") int userId);
    @Delete("delete from thumb_relationship where article_id = #{articleId}")
    int removeAllRecordByArticleId(int articleId);
    @Select("select count(*) from thumb_relationship where article_id = #{articleId} and user_id = #{userId}")
    boolean hasRecord(@Param("articleId") int articleId,@Param("userId") int userId);
    @Select("select count(*) from thumb_relationship where article_id = #{articleId}")
    int countRecord(int articleId);
}
