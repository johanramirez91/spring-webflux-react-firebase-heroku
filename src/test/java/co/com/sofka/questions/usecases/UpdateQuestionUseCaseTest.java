package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.Objects;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class UpdateQuestionUseCaseTest {

    @MockBean
    private QuestionRepository questionRepository;

    @SpyBean
    private UpdateQuestionUseCase updateQuestionUseCase;

    @Test
    void updateQuestionTest(){

        var questionDto = new QuestionDTO(
                "aaa",
                "React o Angular",
                "OPEN",
                "SCIENCES",
                "johan911019@gmail.com"
        );

        var question = new Question();
        question.setId("aaa");
        question.setUserId("abc123");
        question.setQuestion("React o Angular");
        question.setType("OPEN");
        question.setCategory("SCIENCES");
        question.setNumOfReviews(1);
        question.setSumReviewScores(2);
        question.setUserReviews(Arrays.asList("1","2"));
        question.setUserEmail("johan911019@gmail.com");

        Mockito.when(questionRepository.save(Mockito.any(Question.class))).thenReturn(Mono.just(question));

        var response = updateQuestionUseCase.apply(questionDto);

        Assertions.assertEquals(Objects.requireNonNull(response.block()).getId(),"aaa");
        Assertions.assertEquals(Objects.requireNonNull(response.block()).getUserId(),"abc123");
        Assertions.assertEquals(Objects.requireNonNull(response.block()).getQuestion(),"React o Angular");
        Assertions.assertEquals(Objects.requireNonNull(response.block()).getType(),"OPEN");
        Assertions.assertEquals(Objects.requireNonNull(response.block()).getCategory(),"SCIENCES");
        Assertions.assertEquals(Objects.requireNonNull(response.block()).getUserEmail(),"johan911019@gmail.com");
        Assertions.assertEquals(Objects.requireNonNull(response.block()).getNumOfReviews(),1);
        Assertions.assertEquals(Objects.requireNonNull(response.block()).getSumReviewScores(),2);
    }
}