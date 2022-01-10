package co.com.sofka.questions.reposioties;

import co.com.sofka.questions.collections.Question;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import reactor.core.publisher.Flux;

public interface QuestionRepository extends ReactiveCrudRepository<Question, String> {

    Flux<Question> findByUserId(String userId);
}
