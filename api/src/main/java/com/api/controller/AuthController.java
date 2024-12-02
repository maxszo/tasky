package com.api.controller;

import com.api.model.Users;
import com.api.security.JwtTokenProvider;
import com.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users user) {
        try {
            Users authenticatedUser = userService.authenticateUser(user.getMail(), user.getPassword());
            if (authenticatedUser != null) {
                String token = tokenProvider.generateToken(authenticatedUser);
                return ResponseEntity.ok(new AuthResponse(token));
            } else {
                return ResponseEntity.status(401).body("Invalid credentials");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred");
        }
    }

    @GetMapping("/profile")
    public ResponseEntity<Users> getProfile(@RequestHeader("Authorization") String token) {
        try {
            String email = tokenProvider.getUsernameFromToken(token.replace("Bearer ", ""));
            Users user = userService.getUserByEmail(email);
            if (user != null) {
                return ResponseEntity.ok(user);
            }
            return ResponseEntity.status(404).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestHeader("Authorization") String token,
            @RequestBody Users updatedUser) {
        try {
            String email = tokenProvider.getUsernameFromToken(token.replace("Bearer ", ""));
            Users existingUser = userService.getUserByEmail(email);
            if (existingUser != null) {
                Users updated = userService.updateUserProfile(existingUser, updatedUser);
                return ResponseEntity.ok(updated);
            }
            return ResponseEntity.status(404).body("User not found");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred");
        }
    }
}
