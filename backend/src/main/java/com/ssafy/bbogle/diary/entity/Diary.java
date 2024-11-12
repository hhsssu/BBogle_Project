package com.ssafy.bbogle.diary.entity;

import com.ssafy.bbogle.project.entity.Project;
import com.ssafy.bbogle.user.entity.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import lombok.*;
import org.hibernate.annotations.BatchSize;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "diary")
public class Diary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id")
    private Project project;

    @Column(name = "create_date", nullable = false)
    private LocalDate createDate;

    @Column(name = "title", nullable = false)
    @Setter
    private String title;

<<<<<<< HEAD
    @Setter
=======
    @Builder.Default
>>>>>>> 21bf8190be19bdc6aa90798f84999ca48f6e0049
    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<DiaryImage> diaryImages = new HashSet<>();

<<<<<<< HEAD
    @Setter
=======
    @Builder.Default
>>>>>>> 21bf8190be19bdc6aa90798f84999ca48f6e0049
    @OneToMany(mappedBy = "diary", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Answer> answers = new HashSet<>();
}