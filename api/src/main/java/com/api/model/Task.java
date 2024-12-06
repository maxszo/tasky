package com.api.model;

import jakarta.persistence.*;

/**
 * Represents a task in the Tasky application.
 * Each task can be assigned to a user or be unassigned.
 */
@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userStoryNumber;
    private String name;
    private String description;
    private String state;
    private String priority;

    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users users;

    // Default constructor
    public Task() {
    }

    // Constructor with all fields
    public Task(Long id, String userStoryNumber, String name, String description, String state, String priority,
            Users users) {
        this.id = id;
        this.userStoryNumber = userStoryNumber;
        this.name = name;
        this.description = description;
        this.state = state;
        this.priority = priority;
        this.users = users;
    }

    // Constructor with required fields (id, name)
    public Task(Long id, String name) {
        this.id = id;
        this.name = name;
    }

    /**
     * Gets the task's unique identifier.
     * 
     * @return the task's ID
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the task's unique identifier.
     * 
     * @param id the task's ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Gets the task's user story number.
     * 
     * @return the user story number
     */
    public String getUserStoryNumber() {
        return userStoryNumber;
    }

    /**
     * Sets the task's user story number.
     * 
     * @param userStoryNumber the user story number
     */
    public void setUserStoryNumber(String userStoryNumber) {
        this.userStoryNumber = userStoryNumber;
    }

    /**
     * Gets the task's name.
     * 
     * @return the task's name
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the task's name.
     * 
     * @param name the task's name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets the task's description.
     * 
     * @return the task's description
     */
    public String getDescription() {
        return description;
    }

    /**
     * Sets the task's description.
     * 
     * @param description the task's description
     */
    public void setDescription(String description) {
        this.description = description;
    }

    /**
     * Gets the task's state.
     * 
     * @return the task's state
     */
    public String getState() {
        return state;
    }

    /**
     * Sets the task's state.
     * 
     * @param state the task's state
     */
    public void setState(String state) {
        this.state = state;
    }

    /**
     * Gets the task's priority.
     * 
     * @return the task's priority
     */
    public String getPriority() {
        return priority;
    }

    /**
     * Sets the task's priority.
     * 
     * @param priority the task's priority
     */
    public void setPriority(String priority) {
        this.priority = priority;
    }

    /**
     * Gets the user associated with the task.
     * 
     * @return the associated user
     */
    public Users getUsers() {
        return users;
    }

    /**
     * Sets the user associated with the task.
     * 
     * @param user the associated user
     */
    public void setUsers(Users user) {
        this.users = user;
    }
}
