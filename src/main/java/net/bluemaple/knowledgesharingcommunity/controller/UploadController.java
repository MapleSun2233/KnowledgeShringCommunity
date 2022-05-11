package net.bluemaple.knowledgesharingcommunity.controller;

import net.bluemaple.knowledgesharingcommunity.uniformData.UniformMessage;
import net.bluemaple.knowledgesharingcommunity.util.MinIOUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.List;

/**
 * 上传文件相关的路由
 */
@RestController
@RequestMapping("/api")
public class UploadController {
    @Resource
    private MinIOUtil minIOUtil;

    /**
     * 上传图片
     * @param file
     * @return
     */
    @PostMapping("photo")
    public UniformMessage uploadPhoto(MultipartFile file) {
        try {
            String filename = minIOUtil.uploadFile(file);
            return new UniformMessage(200,filename,null);
        }catch (Exception e){
            return new UniformMessage(105,"上传出错",null);
        }
    }
    @PostMapping("avatar")
    public UniformMessage uploadAvatar(MultipartFile file) {
        try {
            String filename = minIOUtil.uploadFile(file,"avatar-");
            return new UniformMessage(200,filename,null);
        }catch (Exception e){
            return new UniformMessage(105,"上传出错",null);
        }
    }
    /**
     * 获取头像库
     * @return
     */
    @GetMapping("avatarList")
    public UniformMessage fileList(){
        try {
            List<String> list = minIOUtil.fileList();
            return new UniformMessage(200,"文件列表",list);
        } catch (Exception e) {
            return new UniformMessage(107,"获取出错",null);
        }
    }
}
