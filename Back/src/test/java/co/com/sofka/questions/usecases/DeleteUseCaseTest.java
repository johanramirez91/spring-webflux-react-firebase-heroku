package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import reactor.core.publisher.Mono;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class DeleteUseCaseTest {

    @MockBean
    AnswerRepository answerRepository;

    @SpyBean
    DeleteAnswerUseCase deleteAnswerUseCase;

    @Test
    void deleteAnswerTest(){

        var answerDto = new AnswerDTO("123", "abc", "¿Cual es el hueso más largo del cuerpo?", "Femur", "foto");

        Mockito.when(answerRepository.deleteById(answerDto.getId())).thenReturn(Mono.empty());

        var response = deleteAnswerUseCase.apply(answerDto.getId()).thenReturn(Mono.empty());

        Assertions.assertEquals(response.block(), Mono.empty());
    }
}