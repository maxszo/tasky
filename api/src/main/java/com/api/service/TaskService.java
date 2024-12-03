package com.api.service;

import com.api.model.Task;
import com.api.repository.TaskRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * TaskService is responsible for handling business logic related to tasks.
 * It interacts with the TaskRepository to perform CRUD operations on Task
 * entities.
 */
@Service
public class TaskService {
    @Autowired
    private EmailService emailService;
    private final TaskRepository taskRepository;

    /**
     * Constructor to inject the TaskRepository into the TaskService.
     * 
     * @param taskRepository the TaskRepository instance used for data access
     */
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * Retrieves all tasks from the repository.
     * 
     * @return a list of all tasks in the database
     */
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    /**
     * Retrieves a task by its unique identifier.
     * If the task is not found, an exception is thrown.
     * 
     * @param id the unique identifier of the task
     * @return the task with the given ID
     * @throws RuntimeException if the task with the given ID does not exist
     */
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    /**
     * Saves a task to the database. If the task already exists, it is updated.
     * 
     * @param task the task to be saved or updated
     * @return the saved or updated task
     */
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    /**
     * Deletes a task by its unique identifier.
     * 
     * @param id the unique identifier of the task to be deleted
     */
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    public void sendMailForTask(Task task) {
        if (task.getUsers() == null)
            return;
        emailService.sendTaskNotification(task.getUsers().getMail(),
                task.getName(),
                task.getDescription());
    }
}
