package com.geonhui.memo.entity;

import lombok.*;
import jakarta.persistence.*;

@Entity
@Table(name = "times_array")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TimesArray {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "time_num")
    private Integer timeNum; // ex. 15, 30, 135

    // Ref: at.at_id < ta.at_id 관계 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "at_id") // AvailableTimes 테이블의 at_id를 참조하는 외래키
    private AvailableTimes availableTimes;
}