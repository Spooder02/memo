package com.geonhui.memo.entity;

import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "meet_team")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
public class MeetTeam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Ref: m.id < mt.m_id 관계 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "m_id", nullable = false) // Meet 테이블의 id를 참조하는 외래키
    private Meet meet;

    // Ref: t.id < mt.t_id 관계 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "t_id", nullable = false) // Team 테이블의 id를 참조하는 외래키
    private Team team;

    @Enumerated(EnumType.STRING) // Enum 값을 String으로 DB에 저장
    private MeetStatus status; // ("참여", "대기중", "거절")

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    public enum MeetStatus {
        참여, 대기중, 거절
    }
}