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
        userService.register(u);

        assertThat(userService.verifyCredentials("test@example.com","secret")).isTrue();
    }
}
