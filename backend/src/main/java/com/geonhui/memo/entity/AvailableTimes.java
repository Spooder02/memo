package com.geonhui.memo.entity;

import lombok.*;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "available_times")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AvailableTimes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "at_id") // ERD에서 at_id로 명시되어 있으므로 컬럼명 지정
    private Long atId;

    @Column(name = "target_date")
    private LocalDate targetDate;

    // ERD의 Ref: u.id < at.at_id 관계를 User가 AvailableTimes를 가질 수 있도록 매핑
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id") // User 테이블의 id를 참조하는 외래키
    private User user;

    // AvailableTimes 1개에 종속된 많은 시간 time (TimesArray)
    @OneToMany(mappedBy = "availableTimes", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<TimesArray> timesArrays = new ArrayList<>();

    // ERD의 Ref: at.at_id - td.id 관계를 TimeDetails가 AvailableTimes를 가질 수 있도록 매핑
    @OneToOne(mappedBy = "availableTimes", cascade = CascadeType.ALL, orphanRemoval = true)
    private TimeDetails timeDetails;
}