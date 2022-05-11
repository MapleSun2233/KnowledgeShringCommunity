package net.bluemaple.knowledgesharingcommunity;

import net.bluemaple.knowledgesharingcommunity.mapper.QuestionMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class TestAnswersMapper {
    @Autowired
    private QuestionMapper questionMapper;
    @Test
    public void testAnswers(){
        System.out.println(questionMapper.getMyQuestionList(2));
    }
}
