package org.example.producer;

import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.example.model.EventMessage;
import org.example.model.EventType;
import org.springframework.stereotype.Component;

@Component
public class EventProducer {

    private static final String TOPIC_NAME = "testy";
    private final Producer<String, EventMessage> kafkaProducer;

    public EventProducer(Producer<String, EventMessage> kafkaProducer) {
        this.kafkaProducer = kafkaProducer;
    }

    public void sendEvent(EventMessage eventMessage) {
        EventType eventType = eventMessage.eventType();

        ProducerRecord<String, EventMessage> record =
                new ProducerRecord<>(
                        TOPIC_NAME,
                        eventType.name(),
                        eventMessage
                );

        kafkaProducer.send(record, (metadata, exception) -> {
            if (exception != null) {
                System.err.println("Error in sending message to Kafka: " + exception.getMessage());
                exception.printStackTrace();
            } else {
                System.out.println("Event: " + eventType);
                System.out.println("Message sent to partition: " + metadata.partition());
                System.out.println("Message sent to Kafka, offset: " + metadata.offset());
            }
        });
    }
}
