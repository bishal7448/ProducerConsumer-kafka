package org.example.consumer;

import org.example.model.EventMessage;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class NotificationEventConsumer {

    @KafkaListener(
        topics = "testy",
        groupId = "notification-service-group"
    )
    public void consume(EventMessage event) {
        if (event == null || event.eventType() == null) {
            return;
        }

        switch (event.eventType()) {
            case USER_REGISTERED,
                 ORDER_CREATED,
                 PAYMENT_COMPLETED,
                 PAYMENT_FAILED -> {
                System.out.println("Sending notification: " + event);
            }
            default -> {
                // ignore
            }
        }
    }
}
