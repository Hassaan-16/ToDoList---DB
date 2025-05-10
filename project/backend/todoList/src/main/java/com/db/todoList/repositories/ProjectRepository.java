package com.db.todoList.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.db.todoList.entities.Project;
import java.util.List;
import java.util.Optional;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    // Find projects by user
    List<Project> findByUserId(Long userId);
      // Find project with all its tasks
    @Query("SELECT p FROM projects p LEFT JOIN FETCH p.tasks WHERE p.projectId = :projectId")
    Optional<Project> findProjectWithTasks(@Param("projectId") Long projectId);
    
    // Find projects by status
    List<Project> findByUserIdAndStatus(Long userId, String status);
    
    // Get project with task count
    @Query("SELECT p, COUNT(t) FROM projects p LEFT JOIN p.tasks t WHERE p.projectId = :projectId GROUP BY p")
    Object[] getProjectWithTaskCount(@Param("projectId") Long projectId);
    
    // Find latest projects
    @Query(value = "SELECT * FROM projects WHERE user_id = :userId ORDER BY project_id DESC LIMIT :limit", nativeQuery = true)
    List<Project> findLatestProjects(@Param("userId") Long userId, @Param("limit") int limit);
}
