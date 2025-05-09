package com.db.todoList.controllers;

import com.db.todoList.entities.Task;
import com.db.todoList.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
public class TaskController {
    
    @Autowired
    private TaskService taskService;
    
    @PostMapping("/project/{projectId}")
    public ResponseEntity<Task> createTask(@RequestBody Task task, @PathVariable Long projectId) {
        return ResponseEntity.ok(taskService.createTask(task, projectId));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Task> getTask(@PathVariable Long id) {
        return taskService.getTaskById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<Task>> getProjectTasks(@PathVariable Long projectId) {
        return ResponseEntity.ok(taskService.getTasksByProjectId(projectId));
    }
    
    @GetMapping("/project/{projectId}/status/{status}")
    public ResponseEntity<List<Task>> getTasksByStatus(
            @PathVariable Long projectId,
            @PathVariable String status) {
        return ResponseEntity.ok(taskService.getTasksByStatus(projectId, status));
    }
    
    @GetMapping("/project/{projectId}/priority/{priority}")
    public ResponseEntity<List<Task>> getTasksByPriority(
            @PathVariable Long projectId,
            @PathVariable String priority) {
        return ResponseEntity.ok(taskService.getTasksByPriority(projectId, priority));
    }
    
    @GetMapping("/project/{projectId}/due-today")
    public ResponseEntity<List<Task>> getTasksDueToday(@PathVariable Long projectId) {
        return ResponseEntity.ok(taskService.getTasksDueToday(projectId));
    }
    
    @GetMapping("/project/{projectId}/overdue")
    public ResponseEntity<List<Task>> getOverdueTasks(@PathVariable Long projectId) {
        return ResponseEntity.ok(taskService.getOverdueTasks(projectId));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Task> updateTask(
            @PathVariable Long id,
            @RequestBody Task task) {
        return ResponseEntity.ok(taskService.updateTask(id, task));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }
}
