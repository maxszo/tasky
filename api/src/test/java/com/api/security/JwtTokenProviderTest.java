package com.api.security;

import com.api.model.Users;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Date;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JwtTokenProviderTest {

    @Mock
    private Users mockUser;

    @Mock
    private Date mockIssuedAtDate;

    @Mock
    private Date mockExpirationDate;

    @InjectMocks
    private JwtTokenProvider jwtTokenProvider;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    // Test generateToken method
    @Test
    void testGenerateToken() {
        // Arrange
        when(mockUser.getMail()).thenReturn("test@example.com");

        // Act
        String token = jwtTokenProvider.generateToken(mockUser);

        // Assert
        assertNotNull(token);
        verify(mockUser).getMail();
    }

    // Test getUsernameFromToken method
    @Test
    void testGetUsernameFromToken() {
        // Arrange
        String expectedUsername = "test@example.com";
        when(mockUser.getMail()).thenReturn(expectedUsername);
        String token = jwtTokenProvider.generateToken(mockUser);

        // Act & Assert
        assertEquals(expectedUsername, jwtTokenProvider.getUsernameFromToken(token));
    }

    @Test
    void testGetUsernameFromInvalidToken() {
        // Arrange
        String invalidToken = "random.invalid.token";

        // Act & Assert
        assertThrows(Exception.class, () -> jwtTokenProvider.getUsernameFromToken(invalidToken));
    }
}
