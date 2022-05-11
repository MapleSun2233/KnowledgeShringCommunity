package net.bluemaple.knowledgesharingcommunity.uniformData;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * 统一个后端回复数据模型
 * code 状态码 这个自己瞎定的，与前端约定好处理就行了
 * message 消息 简短的数据回复就用这个
 * data 数据 复杂的数据回复用这个
 */
@Data
@AllArgsConstructor
public class UniformMessage {
    private int code;
    private String message;
    private Object data;
}
