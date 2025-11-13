package com.dung.smartpitchbooking.repository;

import com.dung.smartpitchbooking.entity.Pitch;
import com.dung.smartpitchbooking.entity.Pitch.PitchType;
import com.dung.smartpitchbooking.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PitchRepository extends JpaRepository<Pitch, Long> {
    
    List<Pitch> findByOwner(User owner);
    
    List<Pitch> findByIsApprovedTrue();
    
    List<Pitch> findByIsApprovedFalse();
    
    List<Pitch> findByTypeAndIsApprovedTrue(PitchType type);
    
    List<Pitch> findByCityContainingIgnoreCaseAndIsApprovedTrue(String city);
}
