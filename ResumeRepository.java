package com.resumex.repository;

import com.resumex.model.Resume;
import com.resumex.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ResumeRepository extends JpaRepository<Resume, Long> {
    List<Resume> findByUserOrderByCreatedAtDesc(User user);
}
