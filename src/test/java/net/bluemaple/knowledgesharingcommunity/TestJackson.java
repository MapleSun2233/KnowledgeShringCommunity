package net.bluemaple.knowledgesharingcommunity;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.bluemaple.knowledgesharingcommunity.pojo.User;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import javax.annotation.Resource;

@SpringBootTest
public class TestJackson {
    @Resource
    private ObjectMapper objectMapper;
    @Test
    public void testJackson() throws JsonProcessingException {
        User user = new User();
        user.setUsername("root");
        String json = objectMapper.writeValueAsString(user);
        User recover = objectMapper.readValue(json, User.class);
        System.out.println(recover);
    }
}
