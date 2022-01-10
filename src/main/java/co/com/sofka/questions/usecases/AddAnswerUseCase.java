package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import co.com.sofka.questions.service.SendEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Service
@Validated
public class AddAnswerUseCase implements SaveAnswer {

    @Autowired
    private final SendEmailService emailService;
    @Autowired
    private final AnswerRepository answerRepository;
    private final MapperUtils mapperUtils;
    private final GetUseCase getUseCase;

    public AddAnswerUseCase(SendEmailService emailService, AnswerRepository answerRepository, MapperUtils mapperUtils, GetUseCase getUseCase) {
        this.emailService = emailService;
        this.answerRepository = answerRepository;
        this.mapperUtils = mapperUtils;
        this.getUseCase = getUseCase;
    }

    public Mono<QuestionDTO> apply(AnswerDTO answerDTO) {
        Objects.requireNonNull(answerDTO.getQuestionId(), "Id of the answer is required");
        return getUseCase.apply(answerDTO.getQuestionId()).flatMap(question ->
                answerRepository.save(mapperUtils.mapperToAnswer().apply(answerDTO))
                        .map(answer -> {
                            question.getAnswers().add(answerDTO);
                            emailService.sendEmail(
                                    question.getUserEmail(),
                                    "Han respondido tu pregunta : " + question.getQuestion(),
                                    "Pregunta : \n" + answer.getAnswer());
                            return question;
                        })
        );
    }

}
