package com.db.todoList.services;

import com.db.todoList.entities.User;
import com.db.todoList.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    // Create
    public User createUser(User user) {
        // Updated exception handling to provide a more descriptive error message
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email already exists. Please use a different email.");
        }
        // Ensure the name is saved as a combination of first name and last name
        User newUser = new User();
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        // Set the combined name explicitly
        newUser.setName(user.getFirstName() + " " + user.getLastName()); // Combine first and last name
        newUser.setEmail(user.getEmail());
        newUser.setPassword(user.getPassword()); // In production, hash this password
        newUser.setPhone(user.getPhone());

        User savedUser = userRepository.save(newUser);
        logger.info("User {} created with ID {}", savedUser.getName(), savedUser.getUserId());

        return savedUser;
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
