package org.example.consumer;

import org.example.model.EventMessage;
import org.example.model.EventType;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class OrderEventConsumer {

    @KafkaListener(
        topics = "testy",
        groupId = "order-service-group"
    )
    public void consume(EventMessage event) {
        if (event != null && event.eventType() == EventType.ORDER_CREATED) {
            System.out.println("Order Service processing: " + event);
        }
    }
}
