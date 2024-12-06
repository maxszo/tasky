package com.api.controller;

import com.api.model.Task;
import com.api.service.TaskService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskControllerTest {

    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // ------------------------------------------
    // *** getAllTasks
    // ------------------------------------------

    @Test
    void getAllTasksWithNoTasks() {
        // Arrange
        List<Task> emptyTasksArray = Arrays.asList();
        when(taskService.getAllTasks()).thenReturn(emptyTasksArray);

        // Act
        List<Task> result = taskController.getAllTasks();

        // Assert
        assertEquals(emptyTasksArray, result);
        verify(taskService).getAllTasks();
    }

    @Test
    void getAllTasksWithOneTask() {
        // Arrange
        List<Task> taskArray = Arrays.asList(new Task(1L, "Task 1"));
        when(taskService.getAllTasks()).thenReturn(taskArray);

        // Act
        List<Task> result = taskController.getAllTasks();

        // Assert
        assertEquals(taskArray, result);
        verify(taskService).getAllTasks();
    }

    @Test
    void getAllTasksWithManyTasks() {
        // Arrange
        List<Task> tasksArray = Arrays.asList(
                new Task(1L, "Task 1"),
                new Task(2L, "Task 2"),
                new Task(3L, "Task 3"));
        when(taskService.getAllTasks()).thenReturn(tasksArray);

        // Act
        List<Task> result = taskController.getAllTasks();

        // Assert
        assertEquals(tasksArray, result);
        verify(taskService).getAllTasks();
    }

    // ------------------------------------------
    // *** getTaskById
    // ------------------------------------------

    @Test
    void getTaskById() {
        // Arrange
        Long taskId = 1L;
        Task expectedTask = new Task(1L, "Task 1");
        when(taskService.getTaskById(taskId)).thenReturn(expectedTask);

        // Act
        Task result = taskController.getTaskById(taskId);

        // Assert
        assertEquals(expectedTask, result);
        verify(taskService).getTaskById(taskId);
    }

    @Test
    void getTaskByIdNotFound() {
        // Arrange
        Long taskId = 1000L;
        when(taskService.getTaskById(taskId)).thenReturn(null);

        // Act
        Task result = taskController.getTaskById(taskId);

        // Assert
        assertNull(result);
        verify(taskService).getTaskById(taskId);
    }

    // ------------------------------------------
    // *** createTask
    // ------------------------------------------

    @Test
    void createTask() {
        // Arrange
        Task task = new Task(null, "New Task");
        Task expectedTask = new Task(1L, "New Task");
        when(taskService.saveTask(any(Task.class))).thenReturn(expectedTask);

        // Act
        Task result = taskController.createTask(task);

        // Assert
        assertNotNull(result.getId());
        assertEquals(expectedTask, result);
        verify(taskService).saveTask(any(Task.class));
    }

    @Test
    void createTaskWithExistingId() {
        // Arrange
        Task task = new Task(1L, "New Task");
        Task expectedTask = new Task(1L, "New Task");
        when(taskService.saveTask(any(Task.class))).thenReturn(expectedTask);

        // Act
        Task result = taskController.createTask(task);

        // Assert
        assertNotNull(result.getId());
        assertEquals(expectedTask, result);
        verify(taskService).saveTask(any(Task.class));
    }

    // ------------------------------------------
    // *** updateTask
    // ------------------------------------------

    @Test
    void updateTask() {
        // Arrange
        Long taskId = 1L;
        Task taskToUpdate = new Task(taskId, "Updated Task");
        Task expectedTask = new Task(taskId, "Updated Task");
        when(taskService.saveTask(any(Task.class))).thenReturn(expectedTask);

        // Act
        Task result = taskController.updateTask(taskId, taskToUpdate);

        // Assert
        assertEquals(expectedTask, result);
        verify(taskService).saveTask(any(Task.class));
    }

    // @Test
    // void updateTaskNotFound() {
    // // Arrange
    // Long taskId = 1000L;
    // Task taskToUpdate = new Task(taskId, "Updated Task");
    // when(taskService.getTaskById(taskId)).thenReturn(null);

    // // Act
    // Task result = taskController.updateTask(taskId, taskToUpdate);

    // // Assert
    // assertNull(result);
    // verify(taskService).getTaskById(taskId);
    // }

    // ------------------------------------------
    // *** deleteTask
    // ------------------------------------------

    @Test
    void deleteTask() {
        // Arrange
        Long taskId = 1L;

        // Act
        taskController.deleteTask(taskId);

        // Assert
        verify(taskService).deleteTask(taskId);
    }

    // @Test
    // void deleteTaskNotFound() {
    // // Arrange
    // Long taskId = 1000L;

    // // Act
    // taskController.deleteTask(taskId);

    // // Assert
    // verify(taskService).getTaskById(taskId);
    // verifyNoMoreInteractions(taskService);
    // }
}
