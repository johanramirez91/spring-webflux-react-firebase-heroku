package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.collections.User;
import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.model.UserDTO;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class MapperUtils {

    public Function<AnswerDTO, Answer> mapperToAnswer() {
        return updateAnswer -> {
            var answer = new Answer();
            answer.setPosition(updateAnswer.getPosition());
            answer.setQuestionId(updateAnswer.getQuestionId());
            answer.setUserId(updateAnswer.getUserId());
            answer.setAnswer(updateAnswer.getAnswer());
            answer.setUserPhotoURL(updateAnswer.getUserPhotoURL());
            return answer;
        };
    }

    public Function<UserDTO, User> mapperToUser(String id) {
        return updateUser -> {
            var user = new User();
            user.setId(id);
            user.setName(updateUser.getName());
            user.setPhotoUrl(updateUser.getPhotoUrl());
            return user;
        };
    }

    public Function<QuestionDTO, Question> mapperToQuestion(String id) {
        return updateQuestion -> {
            var question = new Question();
            question.setId(id);
            question.setUserId(updateQuestion.getUserId());
            question.setCategory(updateQuestion.getCategory());
            question.setQuestion(updateQuestion.getQuestion());
            question.setUserId(updateQuestion.getUserId());
            question.setType(updateQuestion.getType());
            question.setSumReviewsScores(updateQuestion.getSumReviewScores());
            question.setNumOfReviews(updateQuestion.getNumOfReviews());
            question.setUserReviews(updateQuestion.getUserReviews());
            question.setUserEmail(updateQuestion.getUserEmail());
            question.setUserPhotoURL(updateQuestion.getUserPhotoURL());
            return question;
        };
    }

    public Function<Question, QuestionDTO> mapEntityToQuestion() {
        return entity -> new QuestionDTO(
                entity.getId(),
                entity.getUserId(),
                entity.getQuestion(),
                entity.getType(),
                entity.getCategory(),
                entity.getNumOfReviews(),
                entity.getSumReviewsScores(),
                entity.getUserReviews(),
                entity.getUserEmail(),
                entity.getUserPhotoURL()
        );
    }

    public Function<Answer, AnswerDTO> mapEntityToAnswer() {
        return entity -> new AnswerDTO(
                entity.getId(),
                entity.getQuestionId(),
                entity.getUserId(),
                entity.getAnswer(),
                entity.getUserPhotoURL()
        );
    }

    public Function<User, UserDTO> mapEntityToUser() {
        return entity -> new UserDTO(
                entity.getId(),
                entity.getName(),
                entity.getPhotoUrl()
        );
    }
}

