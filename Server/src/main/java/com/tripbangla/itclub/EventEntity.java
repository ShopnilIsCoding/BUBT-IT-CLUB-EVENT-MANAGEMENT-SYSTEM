package com.tripbangla.itclub;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "events")
public class EventEntity {

    @Id
    private String id;
    private String name;
    private String email;
    private String eventTitle;
    private String eventImageUrl;
    private String eventDetails;
    private Date registrationDeadline;
    private int registrationFee;
    private List<String> eventTimeline;  // Assuming it's a list of strings or some other objects
    private Date eventPosted;
    private int currentRegisteredCount;
    private int earnPoints;
    private String category;
    private String eventType;
    private Date registrationDate;
    private String status;

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEventTitle() {
        return eventTitle;
    }

    public void setEventTitle(String eventTitle) {
        this.eventTitle = eventTitle;
    }

    public String getEventImageUrl() {
        return eventImageUrl;
    }

    public void setEventImageUrl(String eventImageUrl) {
        this.eventImageUrl = eventImageUrl;
    }

    public String getEventDetails() {
        return eventDetails;
    }

    public void setEventDetails(String eventDetails) {
        this.eventDetails = eventDetails;
    }

    public Date getRegistrationDeadline() {
        return registrationDeadline;
    }

    public void setRegistrationDeadline(Date registrationDeadline) {
        this.registrationDeadline = registrationDeadline;
    }

    public int getRegistrationFee() {
        return registrationFee;
    }

    public void setRegistrationFee(int registrationFee) {
        this.registrationFee = registrationFee;
    }

    public List<String> getEventTimeline() {
        return eventTimeline;
    }

    public void setEventTimeline(List<String> eventTimeline) {
        this.eventTimeline = eventTimeline;
    }

    public Date getEventPosted() {
        return eventPosted;
    }

    public void setEventPosted(Date eventPosted) {
        this.eventPosted = eventPosted;
    }

    public int getCurrentRegisteredCount() {
        return currentRegisteredCount;
    }

    public void setCurrentRegisteredCount(int currentRegisteredCount) {
        this.currentRegisteredCount = currentRegisteredCount;
    }

    public int getEarnPoints() {
        return earnPoints;
    }

    public void setEarnPoints(int earnPoints) {
        this.earnPoints = earnPoints;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public Date getRegistrationDate() {
        return registrationDate;
    }

    public void setRegistrationDate(Date registrationDate) {
        this.registrationDate = registrationDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
