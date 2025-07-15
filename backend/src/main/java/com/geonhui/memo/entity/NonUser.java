package com.geonhui.memo.entity;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "non_users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NonUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    private String password; // ERD에서 int로 되어있지만, 보통 비밀번호는 String으로 저장합니다.
}