package com.api.controller;

import com.api.model.Users;
import com.api.security.JwtTokenProvider; // Assuming you have this class to generate JWT tokens
import com.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200") // Allow requests from your Angular app
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider tokenProvider; // This will be used to generate the token

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users user) {
        System.out.println("Received login request for email: " + user.getMail());
        try {
            // Authenticate the user
            Users authenticatedUser = userService.authenticateUser(user.getMail(), user.getPassword());
            if (authenticatedUser != null) {
                System.out.println("Authentication successful for email: " + user.getMail());
                // Generate JWT token
                String token = tokenProvider.generateToken(authenticatedUser);
                System.out.println("Generated token: " + token);
                return ResponseEntity.ok(new AuthResponse(token)); // Include token in response
            } else {
                System.out.println("Authentication failed for email: " + user.getMail());
                return ResponseEntity.status(401).body("Invalid credentials");
            }
        } catch (Exception e) {
            System.out.println("Error during login process: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("An error occurred");
        }
    }

    // Get the current user's profile
    @GetMapping("/profile")
    public ResponseEntity<Users> getProfile(@RequestHeader("Authorization") String token) {
        String email = tokenProvider.getUsernameFromToken(token.replace("Bearer ", ""));
        Users user = userService.getUserByEmail(email); // Fetch user from DB by email
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(404).body(null); // User not found
    }

}
