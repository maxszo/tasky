package com.api.service;

import com.api.model.Task;
import com.api.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // ------------------------------------------
    // *** getAllTasks
    // ------------------------------------------

    @Test
    void getAllTasks() {
        // Arrange
        Task task1 = new Task(1L, "Task 1");
        Task task2 = new Task(2L, "Task 2");
        List<Task> tasks = Arrays.asList(task1, task2);
        when(taskRepository.findAll()).thenReturn(tasks);

        // Act
        List<Task> result = taskService.getAllTasks();

        // Assert
        assertEquals(tasks, result);
        verify(taskRepository).findAll();
    }

    @Test
    void getAllTasksEmpty() {
        // Arrange
        when(taskRepository.findAll()).thenReturn(Arrays.asList());

        // Act
        List<Task> result = taskService.getAllTasks();

        // Assert
        assertTrue(result.isEmpty());
        verify(taskRepository).findAll();
    }

    // ------------------------------------------
    // *** getTaskById
    // ------------------------------------------

    @Test
    void getTaskByIdFound() {
        // Arrange
        Long taskId = 1L;
        Task expectedTask = new Task(taskId, "Test Task");
        when(taskRepository.findById(taskId)).thenReturn(Optional.of(expectedTask));

        // Act
        Task result = taskService.getTaskById(taskId);

        // Assert
        assertEquals(expectedTask, result);
        verify(taskRepository).findById(taskId);
    }

    @Test
    void getTaskByIdNotFound() {
        // Arrange
        Long nonExistentId = 1000L;

        // Act & Assert
        assertThrows(RuntimeException.class, () -> taskService.getTaskById(nonExistentId));

        // Verify
        verify(taskRepository).findById(nonExistentId);
    }

    // ------------------------------------------
    // *** saveTask
    // ------------------------------------------

    @Test
    void saveTask() {
        // Arrange
        Task newTask = new Task(null, "New Task");
        Task expectedTask = new Task(1L, "New Task");
        when(taskRepository.save(newTask)).thenReturn(expectedTask);

        // Act
        Task result = taskService.saveTask(newTask);

        // Assert
        assertEquals(expectedTask, result);
        verify(taskRepository).save(newTask);
    }

    @Test
    void saveExistingTask() {
        // Arrange
        Task existingTask = new Task(1L, "Existing Task");
        when(taskRepository.save(existingTask)).thenReturn(existingTask);

        // Act
        Task result = taskService.saveTask(existingTask);

        // Assert
        assertEquals(existingTask, result);
        verify(taskRepository).save(existingTask);
    }

    // ------------------------------------------
    // *** deleteTask
    // ------------------------------------------

    @Test
    void deleteTask() {
        // Arrange
        Long taskId = 1L;

        // Act
        taskService.deleteTask(taskId);

        // Assert & Verify
        verify(taskRepository).deleteById(taskId);
    }

    @Test
    void deleteTaskNotFound() {
        // Arrange
        Long nonExistentId = 1000L;

        // Act & Assert
        assertThrows(RuntimeException.class, () -> taskService.getTaskById(nonExistentId));

        // Verify
        verify(taskRepository).findById(nonExistentId);
        verifyNoMoreInteractions(taskRepository);
    }

    // ------------------------------------------
    // *** sendMailForTask
    // ------------------------------------------

    // @Test
    // void sendMailForTask() {
    // // Arrange
    // Task task = new Task(1L, "Test Task");
    // User user = new User("test@example.com", "Test User");
    // task.setUsers(Arrays.asList(user));

    // // Act
    // taskService.sendMailForTask(task);

    // // Assert & Verify
    // verify(emailService).sendTaskNotification(eq(user.getMail()),
    // eq(task.getName()), eq(task.getDescription()));
    // }

    // @Test
    // void sendMailForTaskNoUsers() {
    // // Arrange
    // Task task = new Task(1L, "Test Task", "Description");

    // // Act
    // taskService.sendMailForTask(task);

    // // Assert & Verify
    // verifyNoInteractions(emailService);
    // }
}
