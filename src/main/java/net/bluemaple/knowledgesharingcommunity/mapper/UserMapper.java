package net.bluemaple.knowledgesharingcommunity.mapper;

import net.bluemaple.knowledgesharingcommunity.pojo.User;
import net.bluemaple.knowledgesharingcommunity.pojo.UserInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface UserMapper{
    User getByUsername(String username);
    User getById(int id);
    int register(User user);
    int hasUsername(String username);
    int updateNicknameAndPhoto(@Param("id")int id, @Param("nickname") String nickname, @Param("photo") String photo);
    int addContributionById(@Param("val") int val,@Param("id") int id);
    int subtractContributionById(@Param("val") int val, @Param("id") int id);
    int addContributionByArticleId(@Param("val") int val,@Param("id") int id);
    int subtractContributionByArticleId(@Param("val") int val, @Param("id") int id);
    List<UserInfo> getContributionTop10(int userId);
    List<UserInfo> getMostQuestionTop10(int userId);
}
