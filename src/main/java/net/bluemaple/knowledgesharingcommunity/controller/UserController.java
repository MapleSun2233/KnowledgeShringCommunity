package net.bluemaple.knowledgesharingcommunity.controller;

import net.bluemaple.knowledgesharingcommunity.pojo.User;
import net.bluemaple.knowledgesharingcommunity.service.FollowerService;
import net.bluemaple.knowledgesharingcommunity.service.UserService;
import net.bluemaple.knowledgesharingcommunity.uniformData.LoginRequestData;
import net.bluemaple.knowledgesharingcommunity.uniformData.RegisterRequestData;
import net.bluemaple.knowledgesharingcommunity.uniformData.UniformMessage;
import net.bluemaple.knowledgesharingcommunity.uniformData.UpdateUserInfoRequestData;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

/**
 * 用户相关的路由
 */
@RestController
@RequestMapping("/api")
public class UserController {
    @Resource
    private UserService userService;
    @Resource
    private FollowerService followerService;
    @PostMapping("login")
    public UniformMessage login(@RequestBody LoginRequestData loginRequestData){
        User user = userService.getUserByUsername(loginRequestData.getUsername());
        if(user == null)
            return new UniformMessage(101,"账号不存在",null);
        String uuid  = UUID.randomUUID().toString();
        if(userService.login(user, loginRequestData.getPassword(),uuid)){
            Map<String,Object> data = new HashMap<>();
            data.put("token",uuid);
            data.put("data", user);
            return new UniformMessage(200,"登录成功", data);
        } else
            return new UniformMessage(102,"密码错误",null);
    }
    @PostMapping("register")
    public UniformMessage register(@RequestBody RegisterRequestData registerRequestData){
        // 判断是否已经存在了
        if(userService.hasUsername(registerRequestData.getUsername())){
            return new UniformMessage(103,"账号已经存在",null);
        }
        String uuid = UUID.randomUUID().toString();
        User user = userService.register(registerRequestData.getUsername(),registerRequestData.getPassword(), uuid);
        Map<String,Object> data = new HashMap<>();
        data.put("token",uuid);
        data.put("data", user);
        return new UniformMessage(200,"注册成功",data);
    }
    @GetMapping("checkLogin")
    public UniformMessage checkLogin(@RequestHeader("token") String token){
        if(userService.isExistToken(token)) return new UniformMessage(200,"登录有效",null);
        return new UniformMessage(104,"登录失效",null);
    }
    @PostMapping("logout")
    public UniformMessage logout(@RequestHeader("token") String token){
        userService.logout(token);
        return new UniformMessage(200,"登出成功",null);
    }

    @PutMapping("user")
    public UniformMessage updateUserInfo(@RequestBody UpdateUserInfoRequestData updateUserInfoRequestData, @RequestHeader("token") String token){
        User user = userService.updateUserNicknameAndPhoto(updateUserInfoRequestData.getId(),updateUserInfoRequestData.getNickname(),updateUserInfoRequestData.getPhoto(), token);
        return new UniformMessage(200,"更新成功",user);
    }
    @PostMapping("followAuthor/{id}")
    public UniformMessage followAuthor(@PathVariable("id") int id , @RequestHeader("token") String token){
        User user = userService.getUserByToken(token);
        int currentUserId = user.getId();
        followerService.subscribe(currentUserId,id);
        return new UniformMessage(200,"关注成功",null);
    }
    @DeleteMapping("followAuthor/{id}")
    public UniformMessage cancelFollowAuthor(@PathVariable("id") int id, @RequestHeader("token") String token){
        User user = userService.getUserByToken(token);
        int currentUserId = user.getId();
        followerService.unsubscribe(currentUserId,id);
        return new UniformMessage(200,"取消关注成功",null);
    }
    @GetMapping("followerList")
    public UniformMessage getFollowerList(@RequestHeader("token") String token){
        User user = userService.getUserByToken(token);
        int currentUserId = user.getId();
        return new UniformMessage(200,"获取成功",followerService.getFollowerList(currentUserId));
    }
    @GetMapping("targetList")
    public UniformMessage getTargetList(@RequestHeader("token") String token){
        User user = userService.getUserByToken(token);
        int currentUserId = user.getId();
        return new UniformMessage(200,"",followerService.getTargetList(currentUserId));
    }
    @GetMapping("contributionTop10")
    public UniformMessage getContributionTop10(@RequestHeader("token")String token){
        User user = userService.getUserByToken(token);
        int currentUserId = user.getId();
        return new UniformMessage(200,"",
                userService.getContributionTop10(currentUserId));
    }
    @GetMapping("mostQuestionTop10")
    public UniformMessage getMostQuestionTop10(@RequestHeader("token") String token){
        User user = userService.getUserByToken(token);
        int currentUserId = user.getId();
        return new UniformMessage(200,"",
                userService.getMostQuestionTop10(currentUserId));
    }
}
