package net.bluemaple.knowledgesharingcommunity;

import net.bluemaple.knowledgesharingcommunity.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;



@SpringBootTest
public class TestUserService {
    @Autowired
    private UserService userService;
    @Test
    public void test(){

    }
}
