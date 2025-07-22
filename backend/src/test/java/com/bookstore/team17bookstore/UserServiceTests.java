package com.bookstore.team17bookstore;

import com.bookstore.team17bookstore.model.User;
import com.bookstore.team17bookstore.service.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class UserServiceTests {
    @Autowired
    private UserService userService;

    @Test
    void registerAndVerify() throws Exception {
        User u = new User("Test","test@example.com","","secret");
 i6jjfw-codex/implement-registration-and-login-features
        u.setAddress("123 Main");
        u.setStatus("ACTIVE");

 k48e5h-codex/implement-registration-and-login-features
        u.setStatus("ACTIVE");

 main
 main
        userService.register(u);

        assertThat(userService.verifyCredentials("test@example.com","secret")).isTrue();
    }
 i6jjfw-codex/implement-registration-and-login-features

 k48e5h-codex/implement-registration-and-login-features
 main

    @Test
    void updateProfile() throws Exception {
        User u = new User("T","u@example.com","","pass");
 i6jjfw-codex/implement-registration-and-login-features
        u.setAddress("123");
 main
        u.setStatus("ACTIVE");
        userService.register(u);
        Long id = userService.idByEmail("u@example.com");
        u.setId(id);
        u.setName("Updated");
        userService.update(u);
        assertThat(userService.findById(id).get().getName()).isEqualTo("Updated");
    }
i6jjfw-codex/implement-registration-and-login-features


 main
 main
}
