package org.example.consumer;

import io.prometheus.client.Counter;
import org.example.model.EventMessage;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsEventConsumer {

    private final Counter kafkaEventsCounter;

    public AnalyticsEventConsumer() {
        kafkaEventsCounter = Counter.build()
                .name("kafka_events_received_total")
                .help("Total number of Kafka events received")
                .register();
    }

    @KafkaListener(
        topics = "testy",
        groupId = "analytics-service-group"
    )
    public void consume(EventMessage event) {
        System.out.println("Analytics Service processing event for metrics: " + event);
        kafkaEventsCounter.inc();
    }
}
