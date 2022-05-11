package net.bluemaple.knowledgesharingcommunity.service.impl;

import net.bluemaple.knowledgesharingcommunity.mapper.*;
import net.bluemaple.knowledgesharingcommunity.pojo.*;
import net.bluemaple.knowledgesharingcommunity.service.QuestionService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.Arrays;
import java.util.List;


@Service
public class QuestionServiceImpl implements QuestionService {
    @Resource
    private QuestionMapper questionMapper;

    @Override
    @Transactional
    public int postQuestion(String headline, String tags, String content, User publisher) {
        Question question = new Question();
        question.setHeadline(headline);
        question.setTags(tags);
        question.setContent(content);
        question.setPublisher(publisher);
        questionMapper.postQuestion(question);
        return question.getId();
    }

    @Override
    @Transactional
    public Article getQuestionById(int id) {
        questionMapper.addViewsByQuestionId(id);
        return questionMapper.getQuestionById(id);
    }

    @Override
    public int getPublisherIdByQuestionId(int id) {
        return questionMapper.getPublisherIdByQuestionId(id);
    }

    @Override
    public int countQuestions(int id) {
        return questionMapper.hasQuestions(id);
    }

    @Override
    public int countAnswers(int id) {
        return questionMapper.hasAnswers(id);
    }

    @Override
    @Transactional
    public void postAnswer(int userId, int questionId, String content) {
        questionMapper.addAnswer(userId, questionId, content);
    }

    @Override
    public List<Answer> getAnswers(int id) {
        return questionMapper.getAllAnswersForThisQuestion(id);
    }

    @Override
    public List<QuestionInfo> getMyQuestionList(int id) {
        return questionMapper.getMyQuestionList(id);
    }

    @Override
    @Transactional
    public void removeQuestionById(int id) {
        questionMapper.removeAllAnswersByQuestionId(id);
        questionMapper.removeQuestion(id);
    }

    @Override
    public List<QuestionInfo> getAPageQuestionListByNew(int page) {
        return questionMapper.getAPageQuestionListByNew(page*10);
    }

    @Override
    public List<QuestionInfo> getAPageQuestionListByViews(int page) {
        return questionMapper.getAPageQuestionListByViews(page*10);
    }

    @Override
    public List<QuestionInfo> getAPageQuestionListByFollow(int page, int id) {
        return questionMapper.getAPageQuestionListByFollow(page*10,id);
    }

    @Override
    public List<QuestionInfo> queryQuestionByKeywords(String keywords) {
        String exp = String.join("|",keywords.split("\\s+"));
        return questionMapper.queryByKeywords(exp);
    }
}
