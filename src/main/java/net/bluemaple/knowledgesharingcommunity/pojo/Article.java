package net.bluemaple.knowledgesharingcommunity.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class Article {
    private int id;
    private String headline;
    private String tags;
    private Date postTime;
    private String content;
    private User publisher;
    private int views;
}
