package com.tripbangla.itclub;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
 class StoryService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<StoryEntity> getStories() {
        return mongoTemplate.findAll(StoryEntity.class);
    }

    public StoryEntity getStoryById(String id) {
        return mongoTemplate.findById(id, StoryEntity.class);
    }


    public StoryEntity addStory(StoryEntity story) {
        return mongoTemplate.save(story);
    }
}