package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Answer;
import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class MapperUtils {

    public Function<AnswerDTO, Answer> mapperToAnswer() {
        return updateAnswer -> {
            var answer = new Answer();
            answer.setQuestionId(updateAnswer.getQuestionId());
            answer.setUserId(updateAnswer.getUserId());
            answer.setAnswer(updateAnswer.getAnswer());
            answer.setUserPhotoURL(updateAnswer.getUserPhotoURL());
            return answer;
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
            question.setNumOfReviews(updateQuestion.getNumOfReviews());
            question.setSumReviewScores(updateQuestion.getSumReviewScores());
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
                entity.getSumReviewScores(),
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
}

