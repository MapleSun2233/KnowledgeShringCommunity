package net.bluemaple.knowledgesharingcommunity.service;


import net.bluemaple.knowledgesharingcommunity.pojo.*;

import java.util.List;


/**
 * 问题相关操作
 */
public interface QuestionService {
    int postQuestion(String headline, String tags, String content, User publisher);
    Article getQuestionById(int id);
    int getPublisherIdByQuestionId(int id);
    int countQuestions(int id);
    int countAnswers(int id);
    void postAnswer(int userId, int articleId, String content);
    List<Answer> getAnswers(int id);
    List<QuestionInfo> getMyQuestionList(int id);
    void removeQuestionById(int id);
    List<QuestionInfo> getAPageQuestionListByNew(int page);
    List<QuestionInfo> getAPageQuestionListByViews(int page);
    List<QuestionInfo> getAPageQuestionListByFollow(int page, int id);
    List<QuestionInfo> queryQuestionByKeywords(String keywords);
}
