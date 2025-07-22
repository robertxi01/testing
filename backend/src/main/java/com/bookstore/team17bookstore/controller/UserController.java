package com.bookstore.team17bookstore.controller;

import com.bookstore.team17bookstore.model.User;
import com.bookstore.team17bookstore.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

// Controller for managing user accounts
// Provides endpoints for user registration, login, and logout
@RestController
@RequestMapping("/users")
public class UserController {
    
    private final UserService svc;

    public UserController(UserService userService) {
        this.svc = userService;
    }

    /**
     * Registers a new user account.
     * @param user the User object containing registration details
     * @return the registered User object
     * @throws SQLException if there is an error accessing the database
     */
    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User register(@RequestBody User user) throws SQLException {
        if (svc.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        user.setStatus("ACTIVE");
        return svc.register(user);
    }

    /**
     * Logs in a user.
     * @param email the user's email address
     * @param password the user's password
     * @return a map containing the session token
     * @throws SQLException if there is an error accessing the database
     */
    @PostMapping("/login")
    public Map<String, String> login(@RequestParam String email, @RequestParam String password) throws SQLException {
        boolean ok = svc.verifyCredentials(email, password);
        if (!ok) throw new RuntimeException("Invalid email or password");

        Long id = svc.idByEmail(email);
        Map<String, String> resp = new HashMap<>();
        resp.put("token", email); //placeholder token
        resp.put("id", id.toString());
        resp.put("name", svc.findById(id).orElseThrow().getName());
        return resp;
    }

    /**
     * Logs out the current user.
     */
    @PostMapping("/logout")
    public void logout() {
        //stateless stub; in a real system you'd invalidate the session/JWT
    }

    /**
     * Get user profile by id.
     */
    @GetMapping("/{id}")
    public User getUser(@PathVariable Long id) throws SQLException {
        return svc.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    /**
     * Find user by email.
     */
    @GetMapping("/by-email")
    public User getByEmail(@RequestParam String email) throws SQLException {
        return svc.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    /**
     * Update user profile.
     * @param id user id
     * @param user updated fields
     */
    @PutMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody User user) throws SQLException {
        user.setId(id);
        svc.update(user);
    }
}
