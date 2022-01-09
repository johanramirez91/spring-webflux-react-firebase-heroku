package co.com.sofka.questions.usecases;

import co.com.sofka.questions.collections.Question;
import co.com.sofka.questions.collections.User;
import co.com.sofka.questions.model.QuestionDTO;
import co.com.sofka.questions.model.UserDTO;
import co.com.sofka.questions.reposioties.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import reactor.core.publisher.Mono;

@Service
@Validated
public class CreateUserUseCase implements SaveUser{

    private final UserRepository userRepository;
    private final MapperUtils mapperUtils;

    public CreateUserUseCase(UserRepository userRepository, MapperUtils mapperUtils) {
        this.userRepository = userRepository;
        this.mapperUtils = mapperUtils;
    }

    @Override
    public Mono<String> apply(UserDTO userDTO) {
        return userRepository.findById(userDTO.getId())
                .switchIfEmpty(userRepository.save(mapperUtils.mapperToUser(userDTO.getId()).apply(userDTO)))
                .map(User::getId);
    }
}
