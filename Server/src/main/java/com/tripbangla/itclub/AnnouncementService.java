package com.tripbangla.itclub;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AnnouncementService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<AnnouncementEntity> getAnnouncements() {
        Query query = new Query().with(Sort.by(Sort.Direction.DESC, "date"));
        return mongoTemplate.findAll(AnnouncementEntity.class);
    }

    public AnnouncementEntity addAnnouncement(AnnouncementEntity announcementData) {
        // Set the current date before saving
        announcementData.setDate(new Date());
        return mongoTemplate.save(announcementData);
    }

}