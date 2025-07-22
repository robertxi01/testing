package com.bookstore.team17bookstore;

import com.bookstore.team17bookstore.model.Book;
import com.bookstore.team17bookstore.service.BookService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class BookServiceTests {
    @Autowired
    private BookService bookService;

    @Test
    void addAndFindBook() throws Exception {
        Book b = new Book();
        b.setTitle("test");
        b.setAuthor("author");
        b.setIsbn("123");
        bookService.add(b);

        assertThat(bookService.findByISBN("123").isPresent()).isTrue();
    }
}
