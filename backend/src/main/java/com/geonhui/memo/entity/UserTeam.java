package com.geonhui.memo.entity;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "user_team")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserTeam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Ref: nu.id < ut.nu_id 관계 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "nu_id") // NonUser 테이블의 id를 참조하는 외래키
    private NonUser nonUser;

    // Ref: u.id < ut.u_id 관계 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "u_id") // User 테이블의 id를 참조하는 외래키
    private User user;

    // Ref: ut.t_id > t.id 관계 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "t_id", nullable = false) // Team 테이블의 id를 참조하는 외래키
    private Team team;
}
