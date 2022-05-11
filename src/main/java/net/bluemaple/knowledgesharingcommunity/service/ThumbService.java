package net.bluemaple.knowledgesharingcommunity.service;

public interface ThumbService {
    void thumb(int articleId, int userId);
    void cancelThumb(int articleId, int userId);
    boolean isThumbed(int articleId, int userId);
    int hasThumbs(int articleId);
}
