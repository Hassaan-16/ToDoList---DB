package com.db.todoList.services;

import com.db.todoList.entities.Project;
import com.db.todoList.entities.User;
import com.db.todoList.repositories.ProjectRepository;
import com.db.todoList.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {
    
    @Autowired
    private ProjectRepository projectRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    // Create
    public Project createProject(Project project, Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
            
        project.setUser(user);
        return projectRepository.save(project);
    }
    
    // Read
    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }
    
    public Optional<Project> getProjectById(Long id) {
        return projectRepository.findById(id);
    }
    
    public List<Project> getProjectsByUserId(Long userId) {
        return projectRepository.findByUserId(userId);
    }
    
    public Optional<Project> getProjectWithTasks(Long projectId) {
        return projectRepository.findProjectWithTasks(projectId);
    }
    
    public List<Project> getProjectsByStatus(Long userId, String status) {
        return projectRepository.findByUserIdAndStatus(userId, status);
    }
    
    // Update
    public Project updateProject(Long id, Project projectDetails) {
        Project project = projectRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Project not found"));
            
        project.setName(projectDetails.getName());
        project.setStatus(projectDetails.getStatus());
        
        return projectRepository.save(project);
    }
    
    // Delete
    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}
