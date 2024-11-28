package com.api.model;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Represents a user in the Tasky application.
 * Each user can have multiple tasks or none.
 */
@Entity
@Table(name = "users")

public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstname;
    private String lastname;
    private String mail;
    private String password;
    private String job;

    @JsonIgnore
    @OneToMany(mappedBy = "users", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Task> tasks;

    /**
     * Gets the user's unique identifier.
     * 
     * @return the user's ID
     */
    public Long getId() {
        return id;
    }

    /**
     * Sets the user's unique identifier.
     * 
     * @param id the user's ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Gets the user's first name.
     * 
     * @return the user's first name
     */
    public String getFirstname() {
        return firstname;
    }

    /**
     * Sets the user's first name.
     * 
     * @param firstname the user's first name
     */
    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    /**
     * Gets the user's last name.
     * 
     * @return the user's last name
     */
    public String getLastname() {
        return lastname;
    }

    /**
     * Sets the user's last name.
     * 
     * @param lastname the user's last name
     */
    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    /**
     * Gets the user's email address.
     * 
     * @return the user's email
     */
    public String getMail() {
        return mail;
    }

    /**
     * Sets the user's email address.
     * 
     * @param mail the user's email
     */
    public void setMail(String mail) {
        this.mail = mail;
    }

    /**
     * Gets the user's password.
     * 
     * @return the user's password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the user's password.
     * 
     * @param password the user's password
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Gets the user's job title.
     * 
     * @return the user's job title
     */
    public String getJob() {
        return job;
    }

    /**
     * Sets the user's job title.
     * 
     * @param job the user's job title
     */
    public void setJob(String job) {
        this.job = job;
    }

    /**
     * Gets the list of tasks associated with the user.
     * 
     * @return the list of tasks
     */
    public List<Task> getTasks() {
        return tasks;
    }

    /**
     * Sets the list of tasks associated with the user.
     * 
     * @param tasks the list of tasks
     */
    public void setTasks(List<Task> tasks) {
        this.tasks = tasks;
    }
}
