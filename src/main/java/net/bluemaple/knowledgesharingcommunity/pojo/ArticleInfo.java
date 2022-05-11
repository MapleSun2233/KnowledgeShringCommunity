package net.bluemaple.knowledgesharingcommunity.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class ArticleInfo {
    private int articleId;
    private String headline;
    private int thumbs;
    private int collections;
    private int comments;
    private int views;
    private Date postTime;
}
