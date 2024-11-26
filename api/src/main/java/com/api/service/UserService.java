package com.api.service;

import com.api.model.Users;
import com.api.repository.UserRepository;
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

    /**
     * Constructor to inject the UserRepository into the UserService.
     * 
     * @param userRepository the UserRepository instance used for data access
     */
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Users authenticateUser(String email, String password) {
        Users user = userRepository.findByMail(email);
        if (user != null && user.getPassword().equals(password)) {
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

    /**
     * Saves a user to the database. If the user already exists, it is updated.
     * 
     * @param user the user to be saved or updated
     * @return the saved or updated user
     */
    public Users saveUser(Users user) {
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
}
