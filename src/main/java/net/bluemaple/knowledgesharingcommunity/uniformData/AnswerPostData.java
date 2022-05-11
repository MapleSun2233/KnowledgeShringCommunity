package net.bluemaple.knowledgesharingcommunity.uniformData;

import lombok.Data;

@Data
public class AnswerPostData {
    private String content;
    private int questionId;
    private int userId;
}
