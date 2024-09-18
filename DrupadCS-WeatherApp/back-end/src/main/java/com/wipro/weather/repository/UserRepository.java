package com.wipro.weather.repository;

import com.wipro.weather.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserName(String username);

    User findByEmail(String email);

    void deleteByUserName(String name);

    boolean existsByUserName(String name);
}
