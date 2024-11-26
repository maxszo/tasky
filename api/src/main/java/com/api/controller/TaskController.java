package com.api.controller;

import com.api.model.Task;
import com.api.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * TaskController is a REST controller that provides CRUD operations
 * for managing tasks. It uses TaskService to interact with the underlying
 * business logic and database.
 */
@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    private final TaskService taskService;

    /**
     * Constructor for TaskController.
     * Injects the TaskService dependency to handle task operations.
     *
     * @param taskService the service layer handling business logic for tasks
     */
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    /**
     * Retrieves a list of all tasks.
     *
     * @return a list of Task objects
     */
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    /**
     * Retrieves a task by its unique ID.
     *
     * @param id the ID of the task to retrieve
     * @return the Task object with the specified ID
     */
    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    /**
     * Creates a new task.
     *
     * @param task the Task object to create
     * @return the newly created Task object
     */
    @PostMapping
    public Task createTask(@RequestBody Task task) {
        return taskService.saveTask(task);
    }

    /**
     * Updates an existing task with the specified ID.
     *
     * @param id   the ID of the task to update
     * @param task the updated Task object
     * @return the updated Task object
     */
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        task.setId(id);
        return taskService.saveTask(task);
    }

    /**
     * Deletes a task by its unique ID.
     *
     * @param id the ID of the task to delete
     */
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}
