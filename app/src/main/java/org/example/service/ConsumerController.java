package org.example.service;

import io.prometheus.client.Counter; // A Counter is used to count something that only goes upward
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class ConsumerController {

    private final Counter kafkaEventsCounter; // track total Kafka events/messages received

    public ConsumerController() {
        kafkaEventsCounter = Counter.build()
                .name("kafka_events_received_total") // counter name
                .help("Total number of Kafka events received") // counter description
                .register();
    }

    @KafkaListener(
            topics = "testy", // listen to this Kafka topic
            groupId = "metrics-consumer-group" // this consumer belongs to the Kafka consumer group
    )
    public void listen(String eventData) { // runs whenever Spring receives a Kafka message
        System.out.println("Received event: " + eventData);
        kafkaEventsCounter.inc(); // increase the Prometheus counter
    }
}
