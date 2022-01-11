package co.com.sofka.questions.service;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.mail.javamail.JavaMailSender;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SendEmailServiceTest {

    @SpyBean
    SendEmailService mailUseCase;

    @MockBean
    JavaMailSender javaMailSender;

    @MockBean
    private MimeMessage mimeMessage;

    @Test
    void sendMailUseCaseTest() throws MessagingException {
        String to = "johan911019@gmail.com";
        String subject = "Alguien respondió tu pregunta";
        String body = "Mensaje recibido";

        Mockito.when(javaMailSender.createMimeMessage()).thenReturn(mimeMessage);
        mailUseCase.sendEmail(to, subject, body);
        Mockito.verify(javaMailSender).send(mimeMessage);
    }

}