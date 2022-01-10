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
import reactor.core.publisher.Flux;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class OwnerListUseCaseTest {

    @MockBean
    QuestionRepository questionRepository;

    @SpyBean
    OwnerListUseCase ownerListUseCase;

    @Test
    void ownerListTest(){

        var questionDTO = new QuestionDTO("abc","¿Cuál?","OPEN","Que es java?","test");
        var question = new Question();
        question.setId("aaa");
        question.setUserId("abc");
        question.setQuestion("OPEN");
        question.setType("Que es java?");
        question.setCategory("test");

        Mockito.when(questionRepository.findByUserId(questionDTO.getUserId())).thenReturn(Flux.just(question));

        var response =  ownerListUseCase.apply(questionDTO.getUserId()).collectList().block();

        assert response != null;
        Assertions.assertEquals(response.get(0).getId(), question.getId());
        Assertions.assertEquals(response.get(0).getUserId(), question.getUserId());
        Assertions.assertEquals(response.get(0).getQuestion(), question.getQuestion());
        Assertions.assertEquals(response.get(0).getType(), question.getType());
        Assertions.assertEquals(response.get(0).getCategory(), question.getCategory());
    }
}