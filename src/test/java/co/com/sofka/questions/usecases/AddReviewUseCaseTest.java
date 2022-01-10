package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.model.ReviewDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class AddReviewUseCaseTest {

    @SpyBean
    AddReviewUseCase addReviewUseCase;

    @Mock
    UpdateQuestionUseCase updateQuestionUseCase;

    @MockBean
    QuestionRepository questionRepository;

    @Test
    void answerTest(){
        List<String> user = new ArrayList<>();
        user.add("idxxx");
        var question =  new Question();
        question.setId("questionId");
        question.setUserId("xxxx-xxxx");
        question.setUserEmail("test@gmail.com");
        question.setQuestion("¿Que es java?");
        question.setType("OPEN (LONG OPEN BOX)");
        question.setCategory("TECHNOLOGY AND COMPUTER");
        question.setNumOfReviews(1);
        question.setSumReviewScores(2);
        question.setUserReviews(user);

        var questionDto = new QuestionDTO(
                "abc123",
                "¿Qué es pyhton?",
                "TECHNOLOGY",
                "TECHNOLOGY",
                "johan911019@hotmail.com"
        );

        Mono<Question> questionMono = Mono.just(question);

        ReviewDTO review = new ReviewDTO();
        review.setUserId("xxxx-xxxx");
        review.setQuestionId("questionId");
        review.setScore("2");

        Mockito.when(questionRepository.findById(Mockito.any(String.class))).thenReturn(Mono.just(question));
        Mockito.when(updateQuestionUseCase.apply(questionDto)).thenReturn(Mono.just(questionDto));
        Mockito.when(questionRepository.save(Mockito.any(Question.class))).thenReturn(Mono.just(question));

        var resultQuestionDTO = addReviewUseCase.addReview(review);
        assert resultQuestionDTO != null;
        Assertions.assertEquals(resultQuestionDTO.block().getId(), question.getId());
        Assertions.assertEquals(resultQuestionDTO.block().getCategory(), question.getCategory());
        Assertions.assertEquals(resultQuestionDTO.block().getQuestion(), question.getQuestion());
    }
}