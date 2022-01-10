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

@SpringBootTest
class GetUseCaseTest {

    @MockBean
    private QuestionRepository questionRepository;

    @SpyBean
    private GetUseCase getUseCase;

    @Test
    void getTest(){

        var questionDto = new QuestionDTO(
                "123",
                "¿Qué es un mapper?",
                "OPEN",
                "SOFTWARE DEVELOPMENT",
                "johan911019@gmail.com"
        );

        var question = new Question();
        question.setId("1");
        question.setQuestion("¿React o Angular?");
        question.setUserId("123");
        question.setType("OPEN");
        question.setCategory("SOFTWARE DEVELPMENT");

        Mockito.when(questionRepository.findById(Mockito.anyString())).thenReturn(Mono.just(question));

        var response = getUseCase.apply("1");

        Assertions.assertEquals(response.block().getQuestion(), "¿React o Angular?");

    }



}