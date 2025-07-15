package com.geonhui.memo.entity;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "time_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimeDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String priority;

    @Column(name = "disclosure_range")
    private String disclosureRange;

    @Column(name = "available_channel")
    private String availableChannel;

    private String description;

    // Ref: at.at_id - td.id 관계 매핑
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "at_id") // AvailableTimes 테이블의 at_id를 참조하는 외래키
    private AvailableTimes availableTimes;
}