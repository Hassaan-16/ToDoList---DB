package com.db.todoList.controllers;

import com.db.todoList.entities.Project;
import com.db.todoList.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectController {
    
    @Autowired
    private ProjectService projectService;
    
    @PostMapping("/user/{userId}")
    public ResponseEntity<Project> createProject(@RequestBody Project project, @PathVariable Long userId) {
        return ResponseEntity.ok(projectService.createProject(project, userId));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProject(@PathVariable Long id) {
        return projectService.getProjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Project>> getUserProjects(@PathVariable Long userId) {
        return ResponseEntity.ok(projectService.getProjectsByUserId(userId));
    }
    
    @GetMapping("/{id}/tasks")
    public ResponseEntity<Project> getProjectWithTasks(@PathVariable Long id) {
        return projectService.getProjectWithTasks(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/user/{userId}/status/{status}")
    public ResponseEntity<List<Project>> getProjectsByStatus(
            @PathVariable Long userId,
            @PathVariable String status) {
        return ResponseEntity.ok(projectService.getProjectsByStatus(userId, status));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(
            @PathVariable Long id,
            @RequestBody Project project) {
        return ResponseEntity.ok(projectService.updateProject(id, project));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok().build();
    }
}
