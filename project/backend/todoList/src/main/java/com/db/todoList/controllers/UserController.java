package com.db.todoList.controllers;

import com.db.todoList.entities.User;
import com.db.todoList.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // For Vite default port
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @PostMapping
    public ResponseEntity<Map<String, String>> createUser(@RequestBody User user) {
        // Validate password match
        if (user.getConfirmPassword() != null && 
            !user.getPassword().equals(user.getConfirmPassword())) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Passwords do not match");
            return ResponseEntity.badRequest().body(errorResponse);
        }

        User createdUser = userService.createUser(user);

        Map<String, String> response = new HashMap<>();
        response.put("message", "User registered successfully");
        response.put("userId", createdUser.getUserId().toString());
        return ResponseEntity.ok(response);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/{id}/projects")
    public ResponseEntity<User> getUserWithProjects(@PathVariable Long id) {
        return userService.getUserWithProjects(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User loginRequest) {
        return userService.getUserByEmail(loginRequest.getEmail())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }
}
