package net.bluemaple.knowledgesharingcommunity.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class QuestionInfo {
    private int questionId;
    private String headline;
    private int answers;
    private int views;
    private Date postTime;
}
