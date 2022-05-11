package net.bluemaple.knowledgesharingcommunity;

import net.bluemaple.knowledgesharingcommunity.pojo.Article;
import net.bluemaple.knowledgesharingcommunity.pojo.User;
import net.bluemaple.knowledgesharingcommunity.service.ArticleService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestArticleService {
    @Autowired
    private ArticleService articleService;
    @Test
    public void test(){
        User user = new User();
        user.setId(2);
        int res = articleService.postArticle("Hello World","{}","啦啦啦啦啦",user);
        System.out.println(res);
    }
    @Test
    public void testGetArticle(){
        Article article = articleService.getArticleById(2);
        System.out.println(article);
    }
    @Test
    public void testDeleteArticle(){
        articleService.removeArticleById(1,3);
    }
}
