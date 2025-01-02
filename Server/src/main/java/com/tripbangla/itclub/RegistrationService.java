package com.tripbangla.itclub;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RegistrationService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public RegistrationEntity addRegistration(RegistrationEntity registrationData) {
        return mongoTemplate.save(registrationData);
    }

    public Map<String, Object> getRegistrationsByEmail(String email, int page, int limit) {
        Query query = new Query(Criteria.where("email").is(email));
        long total = mongoTemplate.count(query, RegistrationEntity.class);

        int skip = (page - 1) * limit;
        query.skip(skip).limit(limit);

        List<RegistrationEntity> registrations = mongoTemplate.find(query, RegistrationEntity.class);

        Map<String, Object> response = new HashMap<>();
        response.put("total", total);
        response.put("page", page);
        response.put("limit", limit);
        response.put("registrations", registrations);

        return response;
    }

    public RegistrationEntity updateRegistrationStatus(String id, String status) {
        Query query = new Query(Criteria.where("_id").is(new ObjectId(id)));
        Update update = new Update().set("status", status);

        // Update the status field
        var updateResult = mongoTemplate.updateFirst(query, update, RegistrationEntity.class);

        if (updateResult.getMatchedCount() == 0) {
            return null; // No matching registration found
        }

        // Return the updated registration
        return mongoTemplate.findOne(query, RegistrationEntity.class);
    }
}
