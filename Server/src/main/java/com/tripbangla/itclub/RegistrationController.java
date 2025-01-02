package com.tripbangla.itclub;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping
    public ResponseEntity<?> addRegistration(@RequestBody RegistrationEntity registrationData) {
        RegistrationEntity savedRegistration = registrationService.addRegistration(registrationData);
        return ResponseEntity.status(201).body(savedRegistration);
    }

    @GetMapping("/{email}")
    public ResponseEntity<Map<String, Object>> getRegistrationsByEmail(
            @PathVariable String email,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit) {
        Map<String, Object> result = registrationService.getRegistrationsByEmail(email, page, limit);
        return ResponseEntity.ok(result);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateRegistrationStatus(@PathVariable String id, @RequestBody Map<String, String> body) {
        String status = body.get("status");

        // Validate ObjectId format
        if (!ObjectId.isValid(id)) {
            return ResponseEntity.badRequest().body(Map.of("message", "Invalid ID format"));
        }

        RegistrationEntity updatedRegistration = registrationService.updateRegistrationStatus(id, status);

        if (updatedRegistration == null) {
            return ResponseEntity.status(404).body(Map.of("message", "Registration not found"));
        }

        return ResponseEntity.ok(Map.of("message", "Status updated successfully", "registration", updatedRegistration));
    }
}
