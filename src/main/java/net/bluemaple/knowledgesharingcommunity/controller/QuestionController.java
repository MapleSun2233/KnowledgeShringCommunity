package net.bluemaple.knowledgesharingcommunity.controller;

import net.bluemaple.knowledgesharingcommunity.pojo.User;
import net.bluemaple.knowledgesharingcommunity.service.*;
import net.bluemaple.knowledgesharingcommunity.uniformData.*;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

/**
 * 文章相关路由
 */
@RestController
@RequestMapping("/api")
public class QuestionController {
    @Resource
    private UserService userService;
    @Resource
    private QuestionService questionService;
    @Resource
    private FollowerService followerService;

    @PostMapping("question")
    public UniformMessage postQuestion(@RequestBody QuestionPostData questionPostData, @RequestHeader("token") String token){
        User user = userService.getUserByToken(token);
        int questionId = questionService.postQuestion(questionPostData.getHeadline(),questionPostData.getTags(),questionPostData.getContent(),user);
        return new UniformMessage(200,String.valueOf(questionId),null);
    }
    @GetMapping("question/{id}")
    public UniformMessage getQuestion(@PathVariable("id") int id){
        return new UniformMessage(200,"",questionService.getQuestionById(id));
    }
    @DeleteMapping("question/{id}")
    public UniformMessage deleteQuestion(@PathVariable("id") int id){
        questionService.removeQuestionById(id);
        return new UniformMessage(200,"",null);
    }
    @GetMapping("myQuestionList")
    public UniformMessage getMyQuestionList(@RequestHeader("token") String token){
        return new UniformMessage(200,"",questionService.getMyQuestionList(userService.getUserByToken(token).getId()));
    }
    @GetMapping("pageQuestionList/{type}/{page}")
    public UniformMessage getAPageQuestionList(@PathVariable("type") String type, @PathVariable("page") int page, @RequestHeader("token") String token){
        switch (type){
            case "follow":
                return new UniformMessage(200,"",
                        questionService.getAPageQuestionListByFollow(page,userService.getUserByToken(token).getId()));
            case "views":
                return new UniformMessage(200, "",questionService.getAPageQuestionListByViews(page));
            case "new":
                return new UniformMessage(200,"", questionService.getAPageQuestionListByNew(page));
            default:
                return new UniformMessage(109, "类型错误",null);
        }
    }
    
    @GetMapping("questionAdditionalInfo/{id}")
    public UniformMessage getQuestionAdditionalInfo(@PathVariable("id") int id, @RequestHeader("token") String token){
        int currentUserId = userService.getUserByToken(token).getId();
        int authorId = questionService.getPublisherIdByQuestionId(id);
        return new UniformMessage(200,"",new QuestionAdditionalInfo(
                followerService.hasFollowers(authorId),
                followerService.isSubscribe(currentUserId,authorId),
                questionService.countQuestions(authorId),
                questionService.countAnswers(id)
        ));
    }
    @GetMapping("answers/{id}")
    public UniformMessage getAnswers(@PathVariable("id") int id){
        return new UniformMessage(200,"",questionService.getAnswers(id));
    }
    @PostMapping("answer")
    public UniformMessage addAnswer(@RequestBody AnswerPostData answerPostData){
        questionService.postAnswer(answerPostData.getUserId(), answerPostData.getQuestionId(), answerPostData.getContent());
        return new UniformMessage(200,"",null);
    }
    @GetMapping("searchQuestion/{keywords}")
    public UniformMessage search(@PathVariable("keywords") String keywords){
        return new UniformMessage(200,"",questionService.queryQuestionByKeywords(keywords));
    }
    @PostMapping("acceptAnswer")
    public UniformMessage handleAccept(@RequestBody AcceptAnswerPostData acceptAnswerPostData){
        questionService.acceptAnswer(acceptAnswerPostData);
        return new UniformMessage(200,"",null);
    }
    @DeleteMapping("acceptAnswer")
    public UniformMessage cancelAccept(@RequestBody AcceptAnswerPostData acceptAnswerPostData){
        questionService.cancelAcceptAnswer(acceptAnswerPostData);
        return new UniformMessage(200,"",null);
    }
}
