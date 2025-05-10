package com.db.todoList.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.db.todoList.entities.Task;
import java.time.LocalDate;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {    // Find tasks by project
    List<Task> findByProject_ProjectId(Long projectId);
    
    // Find tasks by status
    List<Task> findByProject_ProjectIdAndStatus(Long projectId, String status);
    
    // Find tasks by priority
    List<Task> findByProject_ProjectIdAndPriority(Long projectId, String priority);
    
    // Find tasks due today
    @Query("SELECT t FROM tasks t JOIN t.project p WHERE p.projectId = :projectId AND t.dueDate = CURRENT_DATE")
    List<Task> findTasksDueToday(@Param("projectId") Long projectId);
    
    // Find overdue tasks
    @Query("SELECT t FROM tasks t JOIN t.project p WHERE p.projectId = :projectId AND t.dueDate < CURRENT_DATE AND t.status != 'COMPLETED'")
    List<Task> findOverdueTasks(@Param("projectId") Long projectId);
    // Find tasks by status    // Find tasks by priority
    List<Task> findByProject_ProjectIdAndPriorityOrderByDueDateAsc(Long projectId, String priority);


    
    // Find tasks by due date range
    List<Task> findByProject_ProjectIdAndDueDateBetweenOrderByDueDateAsc(Long projectId, LocalDate startDate, LocalDate endDate);
}
