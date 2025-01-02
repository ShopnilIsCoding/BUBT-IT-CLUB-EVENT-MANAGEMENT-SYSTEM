package com.tripbangla.itclub;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private MongoTemplate mongoTemplate;

    public List<UserEntity> getUsers(String search, String role, String roleRequest) {
        Query query = new Query();
        if (search != null) {
            query.addCriteria(Criteria.where("name").regex(search, "i")  // "i" for case-insensitive regex
                    .orOperator(Criteria.where("email").regex(search, "i")));  // same for email
        }
        if (role != null) {
            query.addCriteria(Criteria.where("role").is(role));
        }
        if (roleRequest != null) {
            query.addCriteria(Criteria.where("roleRequest").is(roleRequest));
        }
        return mongoTemplate.find(query, UserEntity.class);  // Correct method to call mongoTemplate
    }

    // Corrected method to return UserEntity by email
    public UserEntity getUserByEmail(String email) {
        Query query = new Query(Criteria.where("email").is(email));  // Find user by email
        return mongoTemplate.findOne(query, UserEntity.class);  // Return the user
    }

    public UserEntity upsertUser(UserEntity user) {
        Query query = new Query(Criteria.where("email").is(user.getEmail()));
        UserEntity existingUser = mongoTemplate.findOne(query, UserEntity.class);

        if (existingUser != null) {
            user.set_id(existingUser.get_id()); // Keep the same ID for updating
        }

        return mongoTemplate.save(user); // MongoDB handles upserting
    }

    public UserEntity updateUserRole(String id, String newRole) {
        Query query = new Query(Criteria.where("_id").is(new ObjectId(id))); // Query by ObjectId
        UserEntity existingUser = mongoTemplate.findOne(query, UserEntity.class);

        if (existingUser == null) {
            return null; // User not found
        }

        existingUser.setRole(newRole); // Update the role
        return mongoTemplate.save(existingUser); // Save the updated user
    }

    public UserEntity incrementUserPoints(String email, int point) {
        Query query = new Query(Criteria.where("email").is(email));
        Update update = new Update().inc("point", point); // Increment the points

        var updateResult = mongoTemplate.updateFirst(query, update, UserEntity.class);

        if (updateResult.getMatchedCount() == 0) {
            return null; // User not found
        }

        // Fetch and return the updated user
        return mongoTemplate.findOne(query, UserEntity.class);
    }

}
