package com.api.repository;

import com.api.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * TaskRepository is a Spring Data JPA repository interface
 * that provides CRUD operations for managing Task entities in the database.
 * It extends JpaRepository, which provides built-in methods such as save,
 * findById, delete, etc.
 */
public interface TaskRepository extends JpaRepository<Task, Long> {
}
