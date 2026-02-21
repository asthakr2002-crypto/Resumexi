package com.resumex.controller;

import com.resumex.model.Resume;
import com.resumex.model.SkillsAnalysis;
import com.resumex.model.User;
import com.resumex.repository.UserRepository;
import com.resumex.repository.SkillsAnalysisRepository;
import com.resumex.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/resumes")
@CrossOrigin(origins = "*")
public class ResumeController {

    @Autowired
    private ResumeService resumeService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private SkillsAnalysisRepository skillsAnalysisRepository;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadResume(@RequestParam("file") MultipartFile file, Authentication authentication) {
        try {
            User user = userRepository.findByEmail(authentication.getName()).get();
            Resume resume = resumeService.processResume(file, user);
            return ResponseEntity.ok(resume);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error processing resume: " + e.getMessage());
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<Resume>> getHistory(Authentication authentication) {
        User user = userRepository.findByEmail(authentication.getName()).get();
        return ResponseEntity.ok(resumeService.getHistory(user));
    }

    @GetMapping("/{resumeId}/analysis")
    public ResponseEntity<SkillsAnalysis> getAnalysis(@PathVariable Long resumeId) {
        return ResponseEntity.ok(skillsAnalysisRepository.findByResumeId(resumeId));
    }
}
