package com.wipro.weather.controllers;

import com.wipro.weather.services.JwtService;
import com.wipro.weather.services.UserService;
import com.wipro.weather.entity.User;
import com.wipro.weather.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/weather")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        Map<String, String> response = new HashMap<>();

        if (userRepository.findByUserName(user.getUserName()) != null) {
            response.put("message", "Username already exists");
            return ResponseEntity.badRequest().body(response);
        }

        if (userRepository.findByEmail(user.getEmail()) != null) {
            response.put("message", "Email already exists");
            return ResponseEntity.badRequest().body(response);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        response.put("message", "User Registered Successfully");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/user/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User user){
        UserDetails userDetails = userService.loadUserByUsername(user.getUserName());

        // Verify the password
        if (passwordEncoder.matches(user.getPassword(), userDetails.getPassword())) {
            // Generate JWT token
            String token = jwtService.generateToken(user.getUserName());

            Collection<? extends GrantedAuthority> authorities = userDetails.getAuthorities();
            List<String> roles = authorities.stream()
                    .map(GrantedAuthority::getAuthority) // Get the roles with "ROLE_" prefix
                    .toList();
            // Create response body
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("roles", roles);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body("Invalid credentials");
        }
    }

    @GetMapping("/user/userList")
    public ResponseEntity<Page<User>> getUserList(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size){
        Page<User> users = userService.getAllUsers(page, size);
        return ResponseEntity.ok(users);
    }



    @DeleteMapping("/user/delete/{name}")
    public ResponseEntity<?> deleteUser(@PathVariable String name){
        boolean res = userService.deleteByUserName(name);
        if (res) {
            return ResponseEntity.ok("User is deleted");
        }return ResponseEntity.badRequest().body("No User");
    }

    @PutMapping("/user/update")
    public ResponseEntity<?> modifyUser(@RequestBody User user){
        boolean res = userService.updateUser(user);
        if (res) {
            return  ResponseEntity.ok().body("User updated successfully");
        }
        return ResponseEntity.badRequest().body("Invalid user name");
    }

    @PutMapping("/user/reset")
    public ResponseEntity<?> resetUserDts(@RequestBody User user){
        boolean res = userService.findUser(user);
        if (res){
            return ResponseEntity.ok().body("user details updated successfully");
        }
        return ResponseEntity.badRequest().body("User Not Found");
    }
}
