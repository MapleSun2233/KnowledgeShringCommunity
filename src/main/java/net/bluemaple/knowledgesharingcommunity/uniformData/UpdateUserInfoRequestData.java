package net.bluemaple.knowledgesharingcommunity.uniformData;

import lombok.Data;

/**
 * 更新昵称和头像的数据请求模型
 */
@Data
public class UpdateUserInfoRequestData {
    private int id;
    private String nickname;
    private String photo;
}
