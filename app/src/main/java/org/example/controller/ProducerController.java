package org.example.controller;

import org.example.model.EventMessage;
import org.example.model.EventRequest;
import org.example.model.EventType;
import org.example.producer.EventProducer;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController // Spring Boot REST controller
@RequestMapping("/producer") // base url -> Every API inside this class starts with: /producer
public class ProducerController {

    private final EventProducer eventProducer;

    public ProducerController(EventProducer eventProducer) {
        this.eventProducer = eventProducer;
    }

    @PostMapping("/event")
    public void sendEventToKafka(@RequestBody EventRequest eventRequest) { // @RequestBody -> takes data sent in API request
        EventType eventType = eventRequest.eventType();

        // Wrap request data into structured EventMessage record
        EventMessage eventMessage = EventMessage.create(
                eventType,
                "ProducerController",
                eventRequest.data()
        );

        eventProducer.sendEvent(eventMessage);
    }
}
