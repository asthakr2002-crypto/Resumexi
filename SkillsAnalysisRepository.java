package com.resumex.repository;

import com.resumex.model.SkillsAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SkillsAnalysisRepository extends JpaRepository<SkillsAnalysis, Long> {
    SkillsAnalysis findByResumeId(Long resumeId);
}
