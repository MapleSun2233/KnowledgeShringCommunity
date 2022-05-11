package net.bluemaple.knowledgesharingcommunity.controller;

import net.bluemaple.knowledgesharingcommunity.pojo.User;
import net.bluemaple.knowledgesharingcommunity.service.*;
import net.bluemaple.knowledgesharingcommunity.uniformData.ArticleAdditionalInfo;
import net.bluemaple.knowledgesharingcommunity.uniformData.ArticlePostData;
import net.bluemaple.knowledgesharingcommunity.uniformData.CommentPostData;
import net.bluemaple.knowledgesharingcommunity.uniformData.UniformMessage;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 文章相关路由
 */
@RestController
@RequestMapping("/api")
public class ArticleController {
    @Resource
    private UserService userService;
    @Resource
    private ArticleService articleService;
    @Resource
    private ThumbService thumbService;
    @Resource
    private CollectionService collectionService;
    @Resource
    private FollowerService followerService;

    @PostMapping("article")
    public UniformMessage postArticle(@RequestBody ArticlePostData articlePostData, @RequestHeader("token") String token){
        User user = userService.getUserByToken(token);
        int articleId = articleService.postArticle(articlePostData.getHeadline(),articlePostData.getTags(),articlePostData.getContent(),user);
        return new UniformMessage(200,String.valueOf(articleId),null);
    }
    @GetMapping("article/{id}")
    public UniformMessage getArticle(@PathVariable("id") int id){
        return new UniformMessage(200,"",articleService.getArticleById(id));
    }
    @DeleteMapping("article/{id}")
    public UniformMessage deleteArticle(@PathVariable("id") int id, @RequestHeader("token") String token){
        User user = userService.getUserByToken(token);
        int currentUserId = user.getId();
        articleService.removeArticleById(id,currentUserId);
        return new UniformMessage(200,"",null);
    }
    @GetMapping("articleAdditionalInfo/{id}")
    public UniformMessage getArticleAdditionalInfo(@PathVariable("id") int id, @RequestHeader("token") String token){
        int currentUserId = userService.getUserByToken(token).getId();
        int authorId = articleService.getAuthorIdByArticleId(id);
        return new UniformMessage(200,"",new ArticleAdditionalInfo(
                followerService.hasFollowers(authorId),
                followerService.isSubscribe(currentUserId,authorId),
                thumbService.hasThumbs(id),
                thumbService.isThumbed(id,currentUserId),
                collectionService.hasCollections(id),
                collectionService.isCollected(id,currentUserId)
        ));
    }
    @GetMapping("pageArticleList/{type}/{page}")
    public UniformMessage getAPageArticleList(@PathVariable("type") String type, @PathVariable("page") int page, @RequestHeader("token") String token){
        switch (type){
            case "follow":
                return new UniformMessage(200,"",
                        articleService.getAPageArticleListByFollow(page,userService.getUserByToken(token).getId()));
            case "views":
                return new UniformMessage(200, "",articleService.getAPageArticleListByViews(page));
            case "new":
                return new UniformMessage(200,"", articleService.getAPageArticleListByNew(page));
            default:
                return new UniformMessage(109, "类型错误",null);
        }
    }
    @GetMapping("myArticleList")
    public UniformMessage getMyArticleList(@RequestHeader("token") String token){
        int currentUserId = userService.getUserByToken(token).getId();
        return new UniformMessage(200,"",articleService.getMyArticleList(currentUserId));
    }
    @PostMapping("thumbArticle/{id}")
    public UniformMessage thumbArticle(@PathVariable("id") int id, @RequestHeader("token") String token){
        int currentUserId = userService.getUserByToken(token).getId();
        thumbService.thumb(id,currentUserId);
        return new UniformMessage(200,"",null);
    }
    @DeleteMapping("thumbArticle/{id}")
    public UniformMessage cancelThumbArticle(@PathVariable("id") int id, @RequestHeader("token") String token){
        int currentUserId = userService.getUserByToken(token).getId();
        thumbService.cancelThumb(id,currentUserId);
        return new UniformMessage(200,"",null);
    }
    @PostMapping("collectArticle/{id}")
    public UniformMessage collectArticle(@PathVariable("id") int id, @RequestHeader("token") String token){
        int currentUserId = userService.getUserByToken(token).getId();
        collectionService.addCollection(id,currentUserId);
        return new UniformMessage(200,"",null);
    }
    @DeleteMapping("collectArticle/{id}")
    public UniformMessage cancelCollectArticle(@PathVariable("id") int id, @RequestHeader("token") String token){
        int currentUserId = userService.getUserByToken(token).getId();
        collectionService.cancelCollection(id,currentUserId);
        return new UniformMessage(200,"",null);
    }
    @GetMapping("myCollectionList")
    public UniformMessage getCollectionList(@RequestHeader("token") String token){
        int currentUserId = userService.getUserByToken(token).getId();
        return new UniformMessage(200,"",collectionService.getCollectionsByUserId(currentUserId));
    }
    @GetMapping("comments/{id}")
    public UniformMessage getComments(@PathVariable("id") int id){
        return new UniformMessage(200,"",articleService.getComments(id));
    }
    @PostMapping("comment")
    public UniformMessage addComment(@RequestBody CommentPostData commentPostData){
        articleService.postComment(commentPostData.getUserId(), commentPostData.getArticleId(), commentPostData.getContent());
        return new UniformMessage(200,"",null);
    }
    @GetMapping("searchArticle/{keywords}")
    public UniformMessage search(@PathVariable("keywords") String keywords){
        return new UniformMessage(200,"",articleService.queryArticleByKeywords(keywords));
    }
}
