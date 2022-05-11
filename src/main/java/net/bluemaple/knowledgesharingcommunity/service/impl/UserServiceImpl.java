package net.bluemaple.knowledgesharingcommunity.service.impl;

import net.bluemaple.knowledgesharingcommunity.mapper.UserMapper;
import net.bluemaple.knowledgesharingcommunity.pojo.User;
import net.bluemaple.knowledgesharingcommunity.pojo.UserInfo;
import net.bluemaple.knowledgesharingcommunity.service.UserService;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.concurrent.TimeUnit;


@Service
public class UserServiceImpl implements UserService {
    @Resource
    RedisTemplate<String, Object> redisTemplate;
    @Resource
    private UserMapper userMapper;
    @Override
    public User getUserByUsername(String username) {
        return userMapper.getByUsername(username);
    }
    @Override
    public User getUserById(int id) {
        return userMapper.getById(id);
    }
    @Override
    public boolean hasUsername(String username){
        return userMapper.hasUsername(username) != 0;
    }
    @Override
    @Transactional
    public User register(String username,String password, String uuid) {
        User user = new User();
        user.setUsername(username);
        user.setPassword(DigestUtils.md5Hex(password));
        userMapper.register(user);
        user = getUserById(user.getId());
        redisTemplate.opsForValue().set(uuid, user);
        restTokenExpire(uuid);
        return user;
    }
//    验证密码加密后是否与数据库的密码一致
    @Override
    public boolean isCorrectPassword(String rawPassword, String password) {
        return DigestUtils.md5Hex(rawPassword).equals(password);
    }

    @Override
    @Transactional
    public User updateUserNicknameAndPhoto(int id,String nickname, String photo, String token) {
        userMapper.updateNicknameAndPhoto(id,nickname,photo);
        User user = getUserById(id);
        redisTemplate.opsForValue().set(token, user);
        return user;
    }

    @Override
    public List<UserInfo> getContributionTop10(int userId) {
        return userMapper.getContributionTop10(userId);
    }

    @Override
    public List<UserInfo> getMostQuestionTop10(int userId) {
        return userMapper.getMostQuestionTop10(userId);
    }

    @Override
    public boolean login(User user, String rawPassword, String uuid) {
        if(!isCorrectPassword(rawPassword, user.getPassword()))
            return false;
        System.out.println(uuid);
        redisTemplate.opsForValue().set(uuid,user);
        restTokenExpire(uuid);
        return true;
    }

    @Override
    public User getUserByToken(String token) {
        return (User)redisTemplate.opsForValue().get(token);
    }

    @Override
    public boolean logout(String token) {
        return redisTemplate.delete(token);
    }

    @Override
    public boolean isExistToken(String token) {
        return redisTemplate.hasKey(token);
    }

    @Override
    public void restTokenExpire(String token) {
        redisTemplate.expire(token, 1, TimeUnit.DAYS);
    }
}
