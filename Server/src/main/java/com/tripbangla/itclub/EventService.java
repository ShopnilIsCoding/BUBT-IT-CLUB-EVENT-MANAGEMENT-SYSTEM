package com.tripbangla.itclub;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.dao.DuplicateKeyException;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private MongoTemplate mongoTemplate;

    // Get all events with optional filtering by tourType
    public List<EventEntity> getEvents() {
        Query query = new Query();

        return mongoTemplate.find(query, EventEntity.class);
    }

    // Get event by its ID
    public EventEntity getEventById(String id) {
        Query query = new Query(Criteria.where("id").is(id));
        return mongoTemplate.findOne(query, EventEntity.class);
    }

    public EventEntity addEvent(EventEntity eventData) {
        return mongoTemplate.save(eventData);
    }
}
