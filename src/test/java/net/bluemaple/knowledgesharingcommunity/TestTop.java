package net.bluemaple.knowledgesharingcommunity;

import net.bluemaple.knowledgesharingcommunity.mapper.UserMapper;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
public class TestTop {
    @Resource
    private UserMapper userMapper;
    @Test
    public void testTop(){
        System.out.println(userMapper.getMostQuestionTop10(1));
    }
}
