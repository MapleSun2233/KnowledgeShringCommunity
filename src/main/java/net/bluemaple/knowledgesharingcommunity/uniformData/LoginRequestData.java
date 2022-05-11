package net.bluemaple.knowledgesharingcommunity.uniformData;

import lombok.Data;

/**
 * 登录请求的数据模型
 */
@Data
public class LoginRequestData {
    private String username;
    private String password;
}
