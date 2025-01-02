package com.tripbangla.itclub;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
 class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<UserEntity>> getUsers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) String roleRequest) {

        List<UserEntity> users = userService.getUsers(search, role, roleRequest);
        return ResponseEntity.ok(users);
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<UserEntity> getUserByEmail(@PathVariable String email) {
        UserEntity user = userService.getUserByEmail(email); // No need to cast if it already returns UserEntity
        if (user == null) {
            return ResponseEntity.notFound().build(); // Return 404 if user not found
        }
        return ResponseEntity.ok(user);
    }
    @PutMapping("/user")
    public ResponseEntity<UserEntity> upsertUser(@RequestBody UserEntity user) {
        UserEntity updatedUser = userService.upsertUser(user);
        return ResponseEntity.ok(updatedUser);
    }

    @PatchMapping("/{id}/role")
    public ResponseEntity<UserEntity> updateUserRole(@PathVariable String id, @RequestBody RoleUpdateRequest roleUpdateRequest) {
        UserEntity updatedUser = userService.updateUserRole(id, roleUpdateRequest.getRole());
        if (updatedUser == null) {
            return ResponseEntity.notFound().build(); // 404 if user not found
        }
        return ResponseEntity.ok(updatedUser);
    }


    @PatchMapping("/points")
    public ResponseEntity<?> updateUserPoints(@RequestBody Map<String, Object> body) {
        String email = (String) body.get("email");
        Integer point = (Integer) body.get("point");

        if (email == null || point == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email and point must be provided"));
        }

        UserEntity updatedUser = userService.incrementUserPoints(email, point);

        if (updatedUser == null) {
            return ResponseEntity.status(404).body(Map.of("message", "User not found"));
        }

        return ResponseEntity.ok(Map.of("message", "Points updated successfully", "user", updatedUser));
    }

}
