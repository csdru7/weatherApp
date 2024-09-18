package com.wipro.weather.services;

import java.util.*;

import com.wipro.weather.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Lazy
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.wipro.weather.entity.User user = userRepository.findByUserName(username);
        String roles = user.getRoles();
        Collection<? extends GrantedAuthority> authorities = Collections.emptyList();

        if (roles != null && !roles.trim().isEmpty()) {
            authorities = Arrays.stream(roles.split(","))
                    .map(role -> new SimpleGrantedAuthority("ROLE_" + role.trim()))
                    .toList();
        }
        return new User(user.getUserName(), user.getPassword(), authorities);
    }

    public Page<com.wipro.weather.entity.User> getAllUsers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return userRepository.findAll(pageable);
    }

    @Transactional
    public boolean deleteByUserName(String name) {

        if(userRepository.existsByUserName(name)){
            userRepository.deleteByUserName(name);
            return true;
        }return false;
    }

    public boolean updateUser(com.wipro.weather.entity.User user) {
        com.wipro.weather.entity.User existingUser = userRepository.findByUserName(user.getUserName());
        if (existingUser == null){
            return false;
        }
        else {
            existingUser.setEmail(user.getEmail());
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
            existingUser.setRoles(user.getRoles());
            userRepository.save(existingUser);
            return true;
        }
    }

    public boolean findUser(com.wipro.weather.entity.User user) {
        com.wipro.weather.entity.User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser == null) {
            return false;
        }

        if (user.getUserName() != null && !user.getUserName().isEmpty()) {
            existingUser.setUserName(user.getUserName());
        }
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            existingUser.setPassword(passwordEncoder.encode(user.getPassword()));
        }

        userRepository.save(existingUser);
        return true;
    }
}
