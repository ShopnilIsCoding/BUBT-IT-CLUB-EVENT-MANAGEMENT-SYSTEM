package com.tripbangla.itclub;

import lombok.Data;

@Data
public class RoleUpdateRequest {
    private String role;

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
