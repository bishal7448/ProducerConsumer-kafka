package org.example.consumer;

import org.example.model.EventMessage;
import org.example.model.EventType;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class PaymentEventConsumer {

    @KafkaListener(
        topics = "testy",
        groupId = "payment-service-group"
    )
    public void consume(EventMessage event) {
        if (event != null && (event.eventType() == EventType.PAYMENT_COMPLETED || event.eventType() == EventType.PAYMENT_FAILED)) {
            System.out.println("Payment Service processing: " + event);
        }
    }
}
