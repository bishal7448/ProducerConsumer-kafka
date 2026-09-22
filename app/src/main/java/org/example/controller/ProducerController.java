package org.example.controller;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.Producer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Properties;

@RestController // Spring Boot REST controller
@RequestMapping("/producer") // base url -> Every API inside this class starts with: /producer
public class ProducerController {
    private static final String TOPIC_NAME = "testy"; // Kafka topic where the message will be sent
    private static final String BOOTSTRAP_SERVERS = "192.168.56.102:9092"; // Address of the Kafka Server

    private final Producer<String, String> kafkaProducer;

    public ProducerController() {
        Properties props = new Properties(); // Creates a container for Kafka configuration
        // kafka server configuration
        props.put("bootstrap.servers", BOOTSTRAP_SERVERS);
        // Kafka needs to convert the Java String key & value into bytes before sending it over the network
        props.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        props.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
        this.kafkaProducer = new KafkaProducer<>(props); // create kafka producer
    }

    @PostMapping("/event")
    public void sendEventToKafka(@RequestBody String eventData) { // @RequestBody -> takes the data sent in the API request
        ProducerRecord<String, String> record = new ProducerRecord<>(TOPIC_NAME, "userEvent", eventData); // create a kafka message, send it in constructor : topic, key, value
        kafkaProducer.send(record, (metadata, exception) -> {
            if (exception != null) {
                System.err.println("Error sending message to Kafka: " + exception.getMessage());
            } else {
                System.out.println("Message sent to Kafka, offset: " + metadata.offset()); // offset is basically the position/number of the message inside the Kafka partition
            }
        });
    }
}
