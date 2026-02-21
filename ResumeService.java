package com.resumex.service;

import com.resumex.model.Resume;
import com.resumex.model.SkillsAnalysis;
import com.resumex.repository.ResumeRepository;
import com.resumex.repository.SkillsAnalysisRepository;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ResumeService {

    @Autowired
    private ResumeRepository resumeRepository;

    @Autowired
    private SkillsAnalysisRepository skillsAnalysisRepository;

    private final String UPLOAD_DIR = "uploads/";

    private final List<String> TECH_SKILLS = Arrays.asList(
            "Java", "Spring Boot", "React", "SQL", "AWS", "Docker", "Python", "JavaScript", "HTML", "CSS",
            "Microservices", "REST API");

    private final List<String> SOFT_SKILLS = Arrays.asList(
            "Communication", "Leadership", "Teamwork", "Problem Solving", "Time Management", "Critical Thinking");

    public Resume processResume(MultipartFile file, com.resumex.model.User user) throws IOException {
        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Save file
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);

        // Extract Text
        String text = "";
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            PDFTextStripper stripper = new PDFTextStripper();
            text = stripper.getText(document);
        }

        // Analyze Skills
        String lowercaseText = text.toLowerCase();
        List<String> foundTech = TECH_SKILLS.stream()
                .filter(skill -> lowercaseText.contains(skill.toLowerCase()))
                .collect(Collectors.toList());

        List<String> missingTech = TECH_SKILLS.stream()
                .filter(skill -> !lowercaseText.contains(skill.toLowerCase()))
                .collect(Collectors.toList());

        List<String> foundSoft = SOFT_SKILLS.stream()
                .filter(skill -> lowercaseText.contains(skill.toLowerCase()))
                .collect(Collectors.toList());

        // Calculate ATS Score
        double score = ((double) (foundTech.size() + foundSoft.size()) / (TECH_SKILLS.size() + SOFT_SKILLS.size()))
                * 100;

        // Save Resume
        Resume resume = new Resume();
        resume.setUser(user);
        resume.setFileName(file.getOriginalFilename());
        resume.setFilePath(filePath.toString());
        resume.setExtractedText(text);
        resume.setAtsScore(score);
        resume = resumeRepository.save(resume);

        // Save Analysis
        SkillsAnalysis analysis = new SkillsAnalysis();
        analysis.setResume(resume);
        analysis.setSkillsFound(String.join(", ", foundTech) + " | " + String.join(", ", foundSoft));
        analysis.setSkillsMissing(String.join(", ", missingTech));
        analysis.setRecommendations("Consider earning certifications in: "
                + String.join(", ", missingTech.stream().limit(3).collect(Collectors.toList())));
        skillsAnalysisRepository.save(analysis);

        return resume;
    }

    public List<Resume> getHistory(com.resumex.model.User user) {
        return resumeRepository.findByUserOrderByCreatedAtDesc(user);
    }
}
