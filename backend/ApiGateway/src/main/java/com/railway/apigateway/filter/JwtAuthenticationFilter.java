package com.railway.apigateway.filter;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import reactor.core.publisher.Mono;

@Component
public class JwtAuthenticationFilter implements GlobalFilter, Ordered {

    private final byte[] signingKeyBytes;

    public JwtAuthenticationFilter(@Value("${jwt.secret}") String jwtSecret) {
        this.signingKeyBytes = jwtSecret.getBytes();
    }

    @Override
public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String path = exchange.getRequest().getPath().toString();

        System.out.println("JwtAuthenticationFilter: Request path: " + path);
        String authHeader = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
        System.out.println("JwtAuthenticationFilter: Authorization header: " + authHeader);

        // Allow login, register, and reservation confirm endpoints without JWT
     // Allow login, register, and public train endpoints without JWT
        if (
            path.contains("/login") ||
            path.contains("/register") ||
            path.contains("/trains/search") ||
            path.contains("/trains/getall") ||
            path.matches(".*/trains/get/\\d+") // allow /trains/get/{id}
        ) {
            System.out.println("JwtAuthenticationFilter: Allowing unauthenticated access to path: " + path);
            return chain.filter(exchange);
        }

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            System.out.println("JwtAuthenticationFilter: Missing or invalid Authorization header");
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(signingKeyBytes)
                    .parseClaimsJws(token)
                    .getBody();

            // Propagate role claim to downstream services
            String role = claims.get("role", String.class);
        if (role != null) {
            System.out.println("JwtAuthenticationFilter: Setting X-Role header: " + role);
            exchange = exchange.mutate()
                    .request(r -> r.header("X-Role", role))
                    .build();
        }
        } catch (Exception e) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -1;
    }
}
