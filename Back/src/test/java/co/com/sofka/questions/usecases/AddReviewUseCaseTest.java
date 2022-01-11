package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.model.Review;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
class AddReviewUseCaseTest {

    @SpyBean
    AddReviewUseCase addReviewUseCase;

    @Mock
    UpdateQuestionUseCase updateQuestionUseCase;

    @MockBean
    QuestionRepository questionRepository;


    @Test
    void setAddReviewTest() {
        List<String> listParameter = new ArrayList<>();
        var questionDTO = new QuestionDTO(
                "xxx", "yyy", "Que es un metodo?",
                "OPEN (LONG OPEN BOX)", "SOFTWARE DEVELOPMENT",
                1, 1, listParameter,
                "johan911019@gmail.com", "www.urlimg.com");

        var resource = new Question();
        resource.setId("xxx");
        resource.setUserId("yyy");
        resource.setQuestion("Que es un metodo?");
        resource.setType("OPEN (LONG OPEN BOX)");
        resource.setCategory("SOFTWARE DEVELOPMENT");
        resource.setNumOfReviews(1);
        resource.setSumReviewScores(1);
        resource.setUserReviews(listParameter);
        resource.setUserEmail("johan911019@gmail.com");

        Mockito.when(questionRepository.findById(Mockito.any(String.class))).thenReturn(Mono.just(resource));
        Mockito.when(updateQuestionUseCase.apply(questionDTO)).thenReturn(Mono.just(questionDTO));
        Mockito.when(questionRepository.save(Mockito.any(Question.class))).thenReturn(Mono.just(resource));

        var review = new Review();
        review.setUserId("yyy");
        review.setScore("3");
        review.setQuestionId("xxx");

        var resultQuestionDTO = addReviewUseCase.addReview(review);
        assert resultQuestionDTO != null;
        Assertions.assertEquals(resultQuestionDTO.block().getId(), resource.getId());
        Assertions.assertEquals(resultQuestionDTO.block().getCategory(), resource.getCategory());
        Assertions.assertEquals(resultQuestionDTO.block().getQuestion(), resource.getQuestion());

    }
}