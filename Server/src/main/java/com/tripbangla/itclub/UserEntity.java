package com.tripbangla.itclub;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collation = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {
    @Id
    private ObjectId _id;
    private  String email;
    private  String name;
    private  int point;
    private  String role;
    private  String status;
    private  String roleRequest;

    // Getters
    public String getEmail() {
        return email;
    }

    public ObjectId get_id() {
        return _id;
    }

    public void set_id(ObjectId _id) {
        this._id = _id;
    }

    // Setter
    public void setRole(String role) {
        this.role = role;
    }
}
