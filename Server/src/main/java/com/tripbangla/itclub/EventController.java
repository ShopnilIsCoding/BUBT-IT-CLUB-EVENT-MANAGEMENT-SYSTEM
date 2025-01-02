package com.tripbangla.itclub;

import com.mongodb.DuplicateKeyException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService eventService;

    @GetMapping
    public ResponseEntity<List<EventEntity>> getEvents(@RequestParam(required = false) String tourType) {
        List<EventEntity> events = eventService.getEvents();
        return ResponseEntity.ok(events);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventEntity> getEventById(@PathVariable String id) {
        EventEntity event = eventService.getEventById(id); // Fixed to call correct method
        if (event == null) {
            return ResponseEntity.notFound().build(); // Return 404 if event not found
        }
        return ResponseEntity.ok(event);
    }

    @PostMapping
    public ResponseEntity<?> addEvent(@RequestBody EventEntity eventData) {
        try {
            EventEntity savedEvent = eventService.addEvent(eventData);
            return ResponseEntity.status(201).body(savedEvent);
        } catch (DuplicateKeyException e) {
            return ResponseEntity.status(409).body("Event with the same ID or unique field already exists.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    Map.of("message", "Failed to add event", "error", e.getMessage()));
        }
    }
}
