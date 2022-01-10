package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.model.Review;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

import javax.validation.constraints.NotNull;

@Service
@Validated
public class AddReviewUseCase {

    @Autowired
    private final QuestionRepository questionRepository;
    private final MapperUtils mapperUtils;
    private final UpdateQuestionUseCase updateQuestionUseCase;


    public AddReviewUseCase(QuestionRepository questionRepository, MapperUtils mapperUtils, UpdateQuestionUseCase updateQuestionUseCase) {
        this.questionRepository = questionRepository;
        this.mapperUtils = mapperUtils;
        this.updateQuestionUseCase = updateQuestionUseCase;
    }

    public Mono<QuestionDTO> addReview(@NotNull Review review) {
        return questionRepository.findById(review.getQuestionId()).flatMap(
                question -> {
                    question.setNumOfReviews(question.getNumOfReviews()+1);
                    question.setSumReviewScores(question.getSumReviewScores()+Integer.parseInt(review.getScore()));
                    question.getUserReviews().add(review.getUserId());
                    question.setUserReviews(question.getUserReviews());
                    return  updateQuestionUseCase.apply(mapperUtils.mapEntityToQuestion().apply(question));
                }
        );
    }

}
