package net.bluemaple.knowledgesharingcommunity.uniformData;

import lombok.Data;

@Data
public class AcceptAnswerPostData {
    private int questionId;
    private int answerId;
    private int userId;
}
