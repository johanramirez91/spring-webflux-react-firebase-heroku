package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.model.ReviewDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AddReviewUseCaseTest {

    @MockBean
    QuestionRepository questionRepository;

    @MockBean
    UpdateQuestionUseCase updateQuestionUseCase;

    @SpyBean
    AddReviewUseCase addReviewUseCase;

    @Test
    void setAddReviewTest(){

        //Arrange
        List<String> list = new ArrayList<>();
        var questionDto = new QuestionDTO(
                "123",
                "123",
                "¿Qué es un Flux?",
                "OPEN (LONG OPEN BOX)",
                "SOFTWARE DEVELOPMENT",
                6,
                1,
                list,
                "johan911019@gmail.com",
                "https://www.url.com/image.png"
        );

        var question = new Question();
        question.setId("123");
        question.setUserId("123");
        question.setQuestion("¿Qué es un Flux?");
        question.setType("OPEN (LONG OPEN BOX)");
        question.setCategory("SOFTWARE DEVELOPMENT");
        question.setNumOfReviews(1);
        question.setSumReviewsScores(1);
        question.setUserReviews(list);
        question.setUserEmail("johan911019@gmail.com");
        question.setUserPhotoURL("https://www.url.com/image.png");

        Mockito.when(questionRepository.findById(Mockito.anyString())).thenReturn(Mono.just(question));
        Mockito.when(updateQuestionUseCase.apply(questionDto)).thenReturn(Mono.just(questionDto));
        Mockito.when(questionRepository.save(Mockito.any(Question.class))).thenReturn(Mono.just(question));

        //Act
        var response = new ReviewDTO();
        response.setUserId("123");
        response.setScore("6");
        response.setQuestionId("123");
        var result = addReviewUseCase.addReview(response);

        //Assert
        Assertions.assertEquals(result.block().getId(), question.getId());
        Assertions.assertEquals(result.block().getCategory(), question.getCategory());
        Assertions.assertEquals(result.block().getQuestion(), question.getQuestion());
        Assertions.assertEquals(result.block().getUserEmail(), question.getUserEmail());
        Assertions.assertEquals(result.block().getNumOfReviews(), question.getNumOfReviews());
    }

}