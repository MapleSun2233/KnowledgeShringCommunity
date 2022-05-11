package net.bluemaple.knowledgesharingcommunity.uniformData;

import lombok.Data;

@Data
public class CommentPostData {
    private String content;
    private int articleId;
    private int userId;
}
