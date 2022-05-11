package net.bluemaple.knowledgesharingcommunity.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class Answer{
    private int id;
    private User publisher; // 发布者
    private int questionId;
    private String content;
    private Date postTime;
}
