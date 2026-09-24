package org.example.model;

import java.time.Instant;
import java.util.Map;
import java.util.UUID;

public record EventMessage(
        String eventId,
        EventType eventType,
        Instant timestamp,
        String source,
        Map<String, Object> data
) {

    public static EventMessage create(
            EventType eventType,
            String source,
            Map<String, Object> data
    ) {
        return new EventMessage(
                UUID.randomUUID().toString(),
                eventType,
                Instant.now(),
                source,
                data
        );
    }
}
