package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

class UpdateUseCaseTest {

    @SpyBean
    private UpdateUseCase updateUseCase;

    @MockBean
    private QuestionRepository repository;

    @Test
    void updateTest(){

        var questionDto = new QuestionDTO(
                "abc123",
                "¿Qué es pyhton?",
                "TECHNOLOGY",
                "TECHNOLOGY",
                "johan911019@hotmail.com"
        );

        var question = new Question();
        question.setId("123");
        question.setUserId("abc123");
        question.setQuestion("¿Qué es pyhton?");
        question.setType("OPEN (LONG OPEN BOX)");
        question.setCategory("TECHNOLOGY AND COMPUTER");
        question.setUserEmail("johan911019@hotmail.com");

        Mockito.when(repository.save(Mockito.any(Question.class))).thenReturn(Mono.just(question));

        var response = updateUseCase.apply(questionDto).block();

        Assertions.assertEquals(Objects.requireNonNull(response),"123");

        Mockito.verify(repository).save(Mockito.any());
    }
}