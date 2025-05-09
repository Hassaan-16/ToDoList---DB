package com.db.todoList.services;

import com.db.todoList.entities.Task;
import com.db.todoList.entities.Project;
import com.db.todoList.repositories.TaskRepository;
import com.db.todoList.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private ProjectRepository projectRepository;
    
    // Create
    public Task createTask(Task task, Long projectId) {
        Project project = projectRepository.findById(projectId)
            .orElseThrow(() -> new RuntimeException("Project not found"));
            
        task.setProject(project);
        return taskRepository.save(task);
    }
    
    // Read
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }
    
    public List<Task> getTasksByProjectId(Long projectId) {
        return taskRepository.findByProjectId(projectId);
    }
    
    public List<Task> getTasksByStatus(Long projectId, String status) {
        return taskRepository.findByProjectIdAndStatus(projectId, status);
    }
    
    public List<Task> getTasksByPriority(Long projectId, String priority) {
        return taskRepository.findByProjectIdAndPriority(projectId, priority);
    }
    
    public List<Task> getTasksDueToday(Long projectId) {
        return taskRepository.findTasksDueToday(projectId);
    }
    
    public List<Task> getOverdueTasks(Long projectId) {
        return taskRepository.findOverdueTasks(projectId);
    }
    
    // Update
    public Task updateTask(Long id, Task taskDetails) {
        Task task = taskRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Task not found"));
            
        task.setName(taskDetails.getName());
        task.setDescription(taskDetails.getDescription());
        task.setDueDate(taskDetails.getDueDate());
        task.setStatus(taskDetails.getStatus());
        task.setPriority(taskDetails.getPriority());
        
        return taskRepository.save(task);
    }
    
    // Delete
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
