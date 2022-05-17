package net.bluemaple.knowledgesharingcommunity.mapper;

import net.bluemaple.knowledgesharingcommunity.pojo.Answer;
import net.bluemaple.knowledgesharingcommunity.pojo.QuestionInfo;
import net.bluemaple.knowledgesharingcommunity.pojo.Question;
import net.bluemaple.knowledgesharingcommunity.pojo.QuestionInfo;
import net.bluemaple.knowledgesharingcommunity.uniformData.AcceptAnswerPostData;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;


@Mapper
public interface QuestionMapper {
    int postQuestion(Question question);
    Question getQuestionById(int id);
    int addViewsByQuestionId(int id);
    int getPublisherIdByQuestionId(int id);
    int hasQuestions(int id);
    int hasAnswers(int id);
    int addAnswer(@Param("userId") int userId, @Param("questionId")  int questionId, @Param("content")  String content);
    List<Answer> getAllAnswersForThisQuestion(int id);
    int removeAllAnswersByQuestionId(int id);
    int removeQuestion(int id);
    List<QuestionInfo> getMyQuestionList(int id);
    List<QuestionInfo> getAPageQuestionListByNew(int page);
    List<QuestionInfo> getAPageQuestionListByViews(int page);
    List<QuestionInfo> getAPageQuestionListByFollow(@Param("page") int page, @Param("userId") int userId);
    List<QuestionInfo> queryByKeywords(String exp);
    int acceptAnswer(AcceptAnswerPostData acceptAnswerPostData);
    int cancelAcceptAnswer(AcceptAnswerPostData acceptAnswerPostData);
}
