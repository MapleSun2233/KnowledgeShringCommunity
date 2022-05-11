package net.bluemaple.knowledgesharingcommunity.uniformData;

import lombok.Data;

/**
 * 注册请求的数据模型
 */
@Data
public class RegisterRequestData {
    private String username;
    private String password;
}
