package net.bluemaple.knowledgesharingcommunity.pojo;

import lombok.Data;

import java.util.Date;

@Data
public class User {
    private int id;
    private String username;
    private String password;
    private String nickname;
    private String photo;
    private int contribution;
    private Date joinTime;
    private String roleType;
}
