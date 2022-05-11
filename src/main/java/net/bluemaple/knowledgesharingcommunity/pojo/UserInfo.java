package net.bluemaple.knowledgesharingcommunity.pojo;

import lombok.Data;

@Data
public class UserInfo {
    private int userId;
    private String username;
    private String nickname;
    private String photo;
    private int contribution;
    private int articles;
    private int questions;
    private int followers;
    private boolean followed;
}
