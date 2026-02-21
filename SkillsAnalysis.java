package com.resumex.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "skills_analysis")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SkillsAnalysis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    @Column(columnDefinition = "TEXT")
    private String skillsFound;

    @Column(columnDefinition = "TEXT")
    private String skillsMissing;

    @Column(columnDefinition = "TEXT")
    private String recommendations;
}
