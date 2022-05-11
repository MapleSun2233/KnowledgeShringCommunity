package net.bluemaple.knowledgesharingcommunity.service;

import net.bluemaple.knowledgesharingcommunity.pojo.User;
import net.bluemaple.knowledgesharingcommunity.pojo.UserInfo;

import java.util.List;

/**
 * 与用户相关的服务操作
 */
public interface UserService{
    User getUserByUsername(String username);
    User getUserById(int id);
    boolean hasUsername(String name);
    User register(String username,String password, String uuid);
    boolean isCorrectPassword(String rawPassword, String password);
    User updateUserNicknameAndPhoto(int id,String nickname, String photo, String token);
    List<UserInfo> getContributionTop10(int userId);
    List<UserInfo> getMostQuestionTop10(int userId);
    boolean login(User user, String rawPassword, String uuid);
    User getUserByToken(String token);
    boolean isExistToken(String token);
    void restTokenExpire(String token);
    boolean logout(String token);
}
