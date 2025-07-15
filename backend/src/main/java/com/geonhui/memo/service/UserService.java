package com.geonhui.memo.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.geonhui.memo.dto.UserLoginDto;
import com.geonhui.memo.dto.UserSignUpDto;
import com.geonhui.memo.entity.User;
import com.geonhui.memo.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // PasswordEncoder 필드 추가

    private static final String DEFAULT_PROFILE_IMG = "default-profile.png";

    // 생성자 주입 (권장 방식)
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User signUp(UserSignUpDto userSignUpDto) {
        String encodedPassword = passwordEncoder.encode(userSignUpDto.getPassword());

        User user = User.builder()
                .profileImg(DEFAULT_PROFILE_IMG)
                .name(userSignUpDto.getName())
                .username(userSignUpDto.getUsername())
                .password(encodedPassword)
                .email(userSignUpDto.getEmail())
                .nickname(userSignUpDto.getNickname())
                .birthday(userSignUpDto.getBirthday())
                .phoneNumber(userSignUpDto.getPhoneNumber())
                .membership("Free") // Default membership
                .joinedAt(LocalDateTime.now())
                .build();

        return userRepository.save(user);
    }

    public User login(UserLoginDto userLoginDto) {
        User user = userRepository.findByUsername(userLoginDto.getUsername()).orElse(null);
        if (user != null) {
            if (passwordEncoder.matches(userLoginDto.getPassword(), user.getPassword())) {
                return user;
            }
        }
        return null;
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }
}
