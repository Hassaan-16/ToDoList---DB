package com.db.todoList.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.db.todoList.entities.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Authentication queries
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);    // Get user with their projects
    @Query("SELECT u FROM users u LEFT JOIN FETCH u.projects WHERE u.userId = :userId")
    Optional<User> findUserWithProjects(@Param("userId") Long userId);

    // Get user with project count
    @Query("SELECT u, COUNT(p) FROM users u LEFT JOIN u.projects p WHERE u.userId = :userId GROUP BY u")
    Object[] getUserWithProjectCount(@Param("userId") Long userId);
}
