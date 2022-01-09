package co.com.sofka.questions.model;

import javax.validation.constraints.NotBlank;

public class UserDTO {

    @NotBlank
    private String id;
    @NotBlank
    private String name;
    @NotBlank
    private String photoUrl;

    public UserDTO(String id, String name, String photoUrl) {
        this.id = id;
        this.name = name;
        this.photoUrl = photoUrl;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }
}
