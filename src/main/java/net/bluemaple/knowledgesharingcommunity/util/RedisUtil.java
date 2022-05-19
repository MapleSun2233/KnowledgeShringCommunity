package net.bluemaple.knowledgesharingcommunity.util;

import net.bluemaple.knowledgesharingcommunity.pojo.User;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.concurrent.TimeUnit;

@Component
public class RedisUtil {
    @Resource
    private RedisTemplate<String,Object> redisTemplate;
    public boolean containsKey(String key){
        return redisTemplate.hasKey(key);
    }
    public boolean removeKey(String key){
        return redisTemplate.delete(key);
    }
    public void setToken(String token, User user){
        redisTemplate.opsForValue().set(token,user,1,TimeUnit.DAYS);
    }
    public boolean resetTokenExpire(String key){
        return redisTemplate.expire(key,1, TimeUnit.DAYS);
    }
    public Object get(String key){
        return redisTemplate.opsForValue().get(key);
    }
}
