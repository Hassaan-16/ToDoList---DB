package com.db.todoList.services;

import com.db.todoList.entities.User;
import com.db.todoList.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    // Create
    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        return userRepository.save(user);
    }
    
    // Read
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public Optional<User> getUserWithProjects(Long userId) {
        return userRepository.findUserWithProjects(userId);
    }
    
    // Update
    public User updateUser(Long id, User userDetails) {
        User user = userRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found"));
            
        user.setName(userDetails.getName());
        user.setEmail(userDetails.getEmail());
        // Don't update password here, create a separate method for password updates
        
        return userRepository.save(user);
    }
    
    // Delete
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
