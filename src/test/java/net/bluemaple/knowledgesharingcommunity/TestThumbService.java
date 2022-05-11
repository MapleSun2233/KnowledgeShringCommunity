package net.bluemaple.knowledgesharingcommunity;

import net.bluemaple.knowledgesharingcommunity.service.ThumbService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestThumbService {
    @Autowired
    private ThumbService thumbService;
    @Test
    public void test(){
        thumbService.cancelThumb(1,2);
    }
}
