package net.bluemaple.knowledgesharingcommunity.uniformData;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ArticleAdditionalInfo {
    private int followers;
    private boolean isFollowed;
    private int thumbs;
    private boolean isThumbed;
    private int collections;
    private boolean isCollected;    
}
