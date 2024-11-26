package com.api.repository;

import com.api.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * UserRepository is a Spring Data JPA repository interface
 * that provides CRUD operations for managing User entities in the database.
 * It extends JpaRepository, which offers built-in methods such as save,
 * findById, delete, etc.
 */
public interface UserRepository extends JpaRepository<Users, Long> {
}
