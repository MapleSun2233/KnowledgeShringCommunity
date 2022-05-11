package net.bluemaple.knowledgesharingcommunity;

import net.bluemaple.knowledgesharingcommunity.mapper.ArticleMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestCommentMapper {
    @Autowired
    private ArticleMapper articleMapper;
    @Test
    public void testAdd(){
        articleMapper.addComment(2,1,"第一条评论");
        articleMapper.addComment(2,1,"第二条评论");
    }
    @Test
    public void testGetAll(){
        System.out.println(articleMapper.getAllCommentsForThisArticle(1));
    }
}
