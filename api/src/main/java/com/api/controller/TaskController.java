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
@CrossOrigin(origins = "http://localhost:4200")
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

    @PostMapping
    public Task createTask(@RequestBody Task task) {
        Task createdTask = taskService.saveTask(task);
        taskService.sendMailForTask(task);
        return createdTask;
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task) {
        task.setId(id);
        Task updatedTask = taskService.saveTask(task);
        taskService.sendMailForTask(task);
        return updatedTask;
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
