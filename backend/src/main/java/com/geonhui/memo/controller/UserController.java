package com.geonhui.memo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.geonhui.memo.dto.UserLoginDto;
import com.geonhui.memo.dto.UserSignUpDto;
import com.geonhui.memo.entity.User;
import com.geonhui.memo.service.UserService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@Controller
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody UserLoginDto entity) {
        User user = userService.login(entity);
        if (user != null) {
            return ResponseEntity.ok(user);
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/signup")
    public ResponseEntity<User> signUp(@RequestBody UserSignUpDto entity) {
        if (entity.getProfileImg() == null || entity.getProfileImg().isEmpty()) {
            entity.setProfileImg("default-profile.png"); // 기본 프로필 이미지 설정
        }
        return ResponseEntity.ok(userService.signUp(entity));
    }

    @GetMapping("/check-username")
    public ResponseEntity<Boolean> checkUsername(@RequestParam String username) {
        User user = userService.findByUsername(username);
        return ResponseEntity.ok(user == null);
    }

    @GetMapping
    public String userApiResponse() {
        return "User API Response";
    }
    
}
