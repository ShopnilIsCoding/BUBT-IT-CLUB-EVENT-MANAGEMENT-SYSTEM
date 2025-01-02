package com.tripbangla.itclub;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/stories")
public class StoryController {

    @Autowired
    private StoryService storyService;

    @GetMapping
    public ResponseEntity<List<StoryEntity>> getStories() {
        List<StoryEntity> stories = storyService.getStories();
        return ResponseEntity.ok(stories);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoryEntity> getStoryById(@PathVariable String id) {
        StoryEntity story = storyService.getStoryById(id);
        return ResponseEntity.ok(story);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> addStory(@RequestBody StoryEntity story) {
        try {
            StoryEntity savedStory = storyService.addStory(story);
            return ResponseEntity.ok(Map.of(
                    "message", "Story added successfully",
                    "story", savedStory
            ));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                    "message", "Failed to add story",
                    "error", e.getMessage()
            ));
        }
    }

}