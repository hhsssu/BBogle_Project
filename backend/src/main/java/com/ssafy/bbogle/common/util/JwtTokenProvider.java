package com.ssafy.bbogle.common.util;

import java.util.Date;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jose.jws.SignatureAlgorithm;
import org.springframework.stereotype.Component;

@Component
public class JwtTokenProvider {

    @Value(value = "${jwt.secret}")
    private String jwtSecret;

    @Value(value = "${jwt.access-expire}")
    private Long accessExpire;

    @Value(value = "${jwt.refresh-expire}")
    private Long refreshExpire;

    public String generateAcessToken(String username){
        return null;
    }

//    private String generateToken(String username, Long expirationTime){
//        return Jwts.builder()
//            .setSubject(username)
//            .setIssuedAt(new Date())
//            .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
//            .signWith(SignatureAlgorithm.)
//    }

}
