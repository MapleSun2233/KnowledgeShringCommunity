package net.bluemaple.knowledgesharingcommunity;

import net.bluemaple.knowledgesharingcommunity.mapper.ArticleMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestArticleMapper {
    @Autowired
    private ArticleMapper articleMapper;
    @Test
    public void testArticleInfo(){
        System.out.println(articleMapper.getMyArticleList(1));
    }
}
