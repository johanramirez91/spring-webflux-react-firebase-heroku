package co.com.sofka.questions.usecases;

import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.model.ReviewDTO;
import co.com.sofka.questions.reposioties.QuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

@Service
@Validated
public class AddReviewUseCase {

    private final QuestionRepository questionRepository;
    private final MapperUtils mapperUtils;
    private final UpdateQuestionUseCase updateQuestionUseCase;

    public AddReviewUseCase(QuestionRepository questionRepository, MapperUtils mapperUtils, UpdateQuestionUseCase updateQuestionUseCase) {
        this.questionRepository = questionRepository;
        this.mapperUtils = mapperUtils;
        this.updateQuestionUseCase = updateQuestionUseCase;
    }

    public Mono<QuestionDTO> addReview(ReviewDTO reviewDTO) {
        return questionRepository.findById(reviewDTO.getQuestionId())
                .flatMap(question -> {
                    question.setNumOfReviews(question.getNumOfReviews() + 1);
                    question.setSumReviewsScores(question.getSumReviewsScores() + Integer.parseInt(reviewDTO.getScore()));
                    question.getUserReviews().add(reviewDTO.getUserId());
                    question.setUserReviews(question.getUserReviews());
                    return updateQuestionUseCase.apply(mapperUtils.mapEntityToQuestion().apply(question));
                });
    }
}
