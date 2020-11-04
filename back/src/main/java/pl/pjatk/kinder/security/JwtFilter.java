package pl.pjatk.kinder.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

public class JwtFilter extends BasicAuthenticationFilter {

    private static final String SIGNING_KEY = "test";

    public JwtFilter(AuthenticationManager authenticationManager) {
        super(authenticationManager);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

        String token = parseJwtToken(request);

        if(token != null) {
            Jws<Claims> claimsJws = Jwts.parser().setSigningKey(SIGNING_KEY.getBytes()).parseClaimsJws(token);

            String role = getJwtValue(claimsJws, "role");
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(getJwtValue(claimsJws, "username"), null, Collections.singleton(new SimpleGrantedAuthority(role)));
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        chain.doFilter(request, response);
    }

    private String parseJwtToken(HttpServletRequest req) {

        String authHeader = req.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }

        return null;
    }

    private String getJwtValue(Jws<Claims> claims, String key) {
        return claims.getBody().get(key).toString();
    }
}
