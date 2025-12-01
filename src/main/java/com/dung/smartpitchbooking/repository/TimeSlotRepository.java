package com.dung.smartpitchbooking.repository;

import com.dung.smartpitchbooking.entity.Pitch;
import com.dung.smartpitchbooking.entity.TimeSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeSlotRepository extends JpaRepository<TimeSlot, Long> {
    
    List<TimeSlot> findByPitchAndIsActiveTrue(Pitch pitch);
    
    List<TimeSlot> findByPitchIdAndIsActiveTrue(Long pitchId);
    
    void deleteByPitch(Pitch pitch);
}
