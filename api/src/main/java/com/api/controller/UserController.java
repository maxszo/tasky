package com.api.controller;

import com.api.model.Users;
import com.api.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * UserController is a REST controller that provides CRUD operations
 * for managing users. It uses UserService to handle business logic
 * and database interactions for users.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    /**
     * Constructor for UserController.
     * Injects the UserService dependency to manage user-related operations.
     *
     * @param userService the service layer responsible for user management
     */
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Retrieves a list of all users.
     *
     * @return a list of Users objects
     */
    @GetMapping
    public List<Users> getAllUsers() {
        return userService.getAllUsers();
    }

    /**
     * Retrieves a user by their unique ID.
     *
     * @param id the ID of the user to retrieve
     * @return the Users object with the specified ID
     */
    @GetMapping("/{id}")
    public Users getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }

    /**
     * Creates a new user.
     *
     * @param user the Users object to create
     * @return the newly created Users object
     */
    @PostMapping
    public Users createUser(@RequestBody Users user) {
        return userService.saveUser(user);
    }

    /**
     * Updates an existing user with the specified ID.
     *
     * @param id   the ID of the user to update
     * @param user the updated Users object
     * @return the updated Users object
     */
    @PutMapping("/{id}")
    public Users updateUser(@PathVariable Long id, @RequestBody Users user) {
        user.setId(id);
        return userService.saveUser(user);
    }

    /**
     * Deletes a user by their unique ID.
     *
     * @param id the ID of the user to delete
     */
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
}
