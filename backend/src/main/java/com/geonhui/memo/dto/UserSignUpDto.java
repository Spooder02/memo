package com.geonhui.memo.dto;

import java.time.LocalDate;

import lombok.*;

@Getter
@Setter
@Builder
public class UserSignUpDto {
    private String profileImg;
    private String name;
    private String username;
    private String password;
    private String email;
    private String nickname;
    private LocalDate birthday;
    private String phoneNumber;
}
