package com.api.service;

import com.api.model.Users;
import com.api.repository.UserRepository;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * UserService is responsible for handling business logic related to users.
 * It interacts with the UserRepository to perform CRUD operations on User
 * entities.
 */
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Constructor to inject the UserRepository into the UserService.
     * 
     * @param userRepository the UserRepository instance used for data access
     */
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Users authenticateUser(String email, String rawPassword) {
        Users user = userRepository.findByMail(email);
        if (user != null && passwordEncoder.matches(rawPassword, user.getPassword())) {
            return user;
        }
        return null; // Return null if authentication fails
    }

    /**
     * Retrieves all users from the repository.
     * 
     * @return a list of all users in the database
     */
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Retrieves a user by their unique identifier.
     * If the user is not found, an exception is thrown.
     * 
     * @param id the unique identifier of the user
     * @return the user with the given ID
     * @throws RuntimeException if the user with the given ID does not exist
     */
    public Users getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Users saveUser(Users user) {
        // Encrypt the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    /**
     * Deletes a user by their unique identifier.
     * 
     * @param id the unique identifier of the user to be deleted
     */
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // ------------------------------

    public Users getUserByEmail(String email) {
        return userRepository.findByMail(email);
    }
}
