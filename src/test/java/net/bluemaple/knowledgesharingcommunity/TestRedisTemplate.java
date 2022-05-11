package net.bluemaple.knowledgesharingcommunity;

import net.bluemaple.knowledgesharingcommunity.pojo.User;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

import javax.annotation.Resource;

@SpringBootTest
public class TestRedisTemplate {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;
    @Test
    public void testJedisTemplate(){
//        User user = new User();
//        user.setId(1);
//        user.setUsername("maple");
//        user.setPassword("123456");
//        redisTemplate.opsForValue().set("user",user);
        System.out.println(redisTemplate.delete("user"));
    }
}
