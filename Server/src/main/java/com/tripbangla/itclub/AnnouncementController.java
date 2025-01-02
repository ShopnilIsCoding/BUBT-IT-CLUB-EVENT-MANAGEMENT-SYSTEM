package com.tripbangla.itclub;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/announcements")
public class AnnouncementController {

    @Autowired
    private AnnouncementService announcementService;

    @GetMapping
    public ResponseEntity<List<AnnouncementEntity>> getAnnouncements() {
        List<AnnouncementEntity> announcements = announcementService.getAnnouncements();
        return ResponseEntity.ok(announcements);
    }

    @PostMapping
    public ResponseEntity<?> addAnnouncement(@RequestBody AnnouncementEntity announcementData) {
        try {
            AnnouncementEntity savedAnnouncement = announcementService.addAnnouncement(announcementData);
            return ResponseEntity.status(201).body(
                    Map.of("message", "Announcement posted successfully", "data", savedAnnouncement));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", "Server Error", "details", e.getMessage()));
        }
    }

}