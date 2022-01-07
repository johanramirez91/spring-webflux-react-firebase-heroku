package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.AnswerDTO;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.reposioties.AnswerRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

import java.util.Objects;

@Service
@Validated
public class AddAnswerUseCase implements SaveAnswer {
    private final AnswerRepository answerRepository;
    private final MapperUtils mapperUtils;
    private final GetUseCase getUseCase;
    private final JavaMailSender javaMailSender;

    public AddAnswerUseCase(AnswerRepository answerRepository, MapperUtils mapperUtils, GetUseCase getUseCase, JavaMailSender javaMailSender) {
        this.answerRepository = answerRepository;
        this.mapperUtils = mapperUtils;
        this.getUseCase = getUseCase;
        this.javaMailSender = javaMailSender;
    }

    public Mono<String> sendEmail(String to, String subject, String body){
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom("johan911019@gmail.com");
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(body);
        javaMailSender.send(simpleMailMessage);
        return Mono.just("Email enviado!");
    }

    public Mono<QuestionDTO> apply(AnswerDTO answerDTO) {
        Objects.requireNonNull(answerDTO.getQuestionId(), "Id of the answer is required");
        return getUseCase.apply(answerDTO.getQuestionId()).flatMap(question ->
                answerRepository.save(mapperUtils.mapperToAnswer().apply(answerDTO))
                        .map(answer -> {
                            question.getAnswers().add(answerDTO);
                            var response = sendEmail(question.getUserEmail(),
                                    "Aguien respondió tu pregunta: " + question.getQuestion(),
                                    "Respuesta: \n" + answer.getAnswer());
                            return question;
                        })
        );
    }

}
