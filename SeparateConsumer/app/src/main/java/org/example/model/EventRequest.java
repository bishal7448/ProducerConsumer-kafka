package org.example.model;

import java.util.Map;

public record EventRequest(
        EventType eventType,
        Map<String, Object> data
) {
}
