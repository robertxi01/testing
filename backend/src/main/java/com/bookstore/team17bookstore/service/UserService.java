package com.bookstore.team17bookstore.service;

import com.bookstore.team17bookstore.model.User;
import com.bookstore.team17bookstore.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.Optional;

// Service for managing users
@Service
public class UserService {
    private final UserRepository repo;
    private final PasswordEncoder encoder;
    public UserService(UserRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    /**
     * Registers a new user.
     * @param user the user to register
     * @return the registered user with its ID set
     * @throws SQLException on error
     */
    public User register(User user) throws SQLException {
        if (findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    /**
     * Finds a user by email.
     * @param email the email to search for
     * @return an Optional containing the user if found, or empty if not found
     * @throws SQLException on error
     */
    public Optional<User> findByEmail(String email) throws SQLException {
        return repo.findByEmail(email);
    }

    /**
     * Finds a user by ID.
     * @param id the ID of the user
     * @return an Optional containing the user if found, or empty if not found
     * @throws SQLException on error
     */
    public Optional<User> findById(Long id) throws SQLException {
        return repo.findById(id);
    }

    /**
     * Retrieves the ID of a user by their email.
     * @param email the email of the user
     * @return the user ID
     * @throws SQLException if there is an error accessing the database
     * @throws RuntimeException if no user is found with the given email
     */
    public Long idByEmail(String email) throws SQLException {
        return findByEmail(email).map(User::getId).orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
    
    /**
     * Verifies user credentials.
     * @param email the user's email
     * @param password the user's password
     * @return true if credentials are valid, false otherwise
     * @throws SQLException if there is an error accessing the database
     */
    public boolean verifyCredentials(String email, String password) throws SQLException {
        Optional<User> userOpt = findByEmail(email);
        return userOpt.map(user -> encoder.matches(password, user.getPassword()))
                      .orElse(false);
    }

    /**
     * Updates an existing user's profile.
     * @param user the user with new values (must have id set)
     * @throws SQLException on error
     */
    public void update(User user) throws SQLException {
        if (user.getPassword() != null) {
            user.setPassword(encoder.encode(user.getPassword()));
        }
        repo.update(user);
    }
}
