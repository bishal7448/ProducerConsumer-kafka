package org.example.consumer;

import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import org.example.model.EventMessage;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class AnalyticsEventConsumer {

    private final Counter kafkaEventsCounter;

    public AnalyticsEventConsumer(MeterRegistry meterRegistry) {
        this.kafkaEventsCounter = Counter.builder("kafka_events_received_total")
                .description("Total number of Kafka events received")
                .register(meterRegistry);
    }

    @KafkaListener(
        topics = "testy",
        groupId = "analytics-service-group"
    )
    public void consume(EventMessage event) {
        System.out.println("Analytics Service processing event for metrics: " + event);
        kafkaEventsCounter.increment();
    }
}

