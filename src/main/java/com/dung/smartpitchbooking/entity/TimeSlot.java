package com.dung.smartpitchbooking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "time_slots")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimeSlot {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pitch_id", nullable = false)
    private Pitch pitch;
    
    @Column(nullable = false)
    private String startTime; // "06:00"
    
    @Column(nullable = false)
    private String endTime; // "07:00"
    
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price; // Giá riêng cho khung giờ này (có thể khác giá mặc định)
    
    @Column(nullable = false)
    private Boolean isActive = true;
}
