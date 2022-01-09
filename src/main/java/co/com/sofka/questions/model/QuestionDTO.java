package co.com.sofka.questions.model;

import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

public class QuestionDTO {

    private String id;
    @NotBlank
    private String userId;
    @NotBlank
    private String question;
    @NotBlank
    private String type;
    @NotBlank
    private String category;
    private List<AnswerDTO> answers;
    private Integer numOfReviews = 0;
    private Integer sumReviewScores = 0;
    private List<String> userReviews = new ArrayList<>();
    private String userEmail;
    private String userPhotoURL;


    public QuestionDTO() {

    }

    public QuestionDTO(String userId, String question, String type, String category, String userEmail) {
        this.userId = userId;
        this.question = question;
        this.type = type;
        this.category = category;
        this.userEmail = userEmail;
    }

    public QuestionDTO(String id, String userId, String question, String type, String category,
                       Integer numOfReviews, Integer sumReviewScores, List<String> userReviews,
                       String userEmail, String userPhotoURL) {
        this.id = id;
        this.userId = userId;
        this.question = question;
        this.type = type;
        this.category = category;
        this.numOfReviews = numOfReviews;
        this.sumReviewScores = sumReviewScores;
        this.userReviews = userReviews;
        this.userEmail = userEmail;
        this.userPhotoURL = userPhotoURL;
    }

    public String getUserPhotoURL() {
        return userPhotoURL;
    }

    public void setUserPhotoURL(String userPhotoURL) {
        this.userPhotoURL = userPhotoURL;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<AnswerDTO> getAnswers() {
        this.answers = Optional.ofNullable(answers).orElse(new ArrayList<>());
        return answers;
    }

    public void setAnswers(List<AnswerDTO> answers) {
        this.answers = answers;
    }

    public Integer getNumOfReviews() {
        return numOfReviews;
    }

    public void setNumOfReviews(Integer numOfReviews) {
        this.numOfReviews = numOfReviews;
    }

    public Integer getSumReviewScores() {
        return sumReviewScores;
    }

    public void setSumReviewScores(Integer sumReviewScores) {
        this.sumReviewScores = sumReviewScores;
    }

    public List<String> getUserReviews() {
        return userReviews;
    }

    public void setUserReviews(List<String> userReviews) {
        this.userReviews = userReviews;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    @Override
    public String toString() {
        return "QuestionDTO{" +
                "id='" + id + '\'' +
                ", userId='" + userId + '\'' +
                ", question='" + question + '\'' +
                ", type='" + type + '\'' +
                ", category='" + category + '\'' +
                ", answers=" + answers +
                ", numOfReviews=" + numOfReviews +
                ", sumReviewScores=" + sumReviewScores +
                ", userReviews=" + userReviews +
                ", userEmail='" + userEmail + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QuestionDTO that = (QuestionDTO) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
