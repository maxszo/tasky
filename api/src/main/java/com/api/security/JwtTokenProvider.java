package com.api.security;

import com.api.model.Users;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtTokenProvider {

    private final String SECRET_KEY = "gHpM64Hndz87AJPP12smP4586JhdbzDFZ7145gPZJF56346FZ5464zqgsgsgzsg7831gz3g4ds6gIOhIUHFg534g5dsgJIOPJ55";

    public String generateToken(Users user) {
        return Jwts.builder()
                .setSubject(user.getMail()) // You can include user info in the payload
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // Set expiration time (1 hour)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }
}
