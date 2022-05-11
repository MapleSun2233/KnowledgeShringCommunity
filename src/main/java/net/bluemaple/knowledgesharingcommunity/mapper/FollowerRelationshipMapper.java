package net.bluemaple.knowledgesharingcommunity.mapper;

import net.bluemaple.knowledgesharingcommunity.pojo.UserInfo;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface FollowerRelationshipMapper {
    int addRecord(@Param("followerId") int followerId,@Param("targetId") int targetId);
    int removeRecord(@Param("followerId") int followerId,@Param("targetId") int targetId);
    boolean hasRecord(@Param("followerId") int followerId,@Param("targetId") int targetId);
    int countFollowers(int targetId);
    int countTargets(int followerId);
    List<UserInfo> getFollowerList(int targetId);
    List<UserInfo> getTargetList(int followerId);
}
