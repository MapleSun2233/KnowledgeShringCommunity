package net.bluemaple.knowledgesharingcommunity.uniformData;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionAdditionalInfo {
    private int followers;
    private boolean isFollowed;
    private int questions;
    private int answers;
}
