# 🎓 EduStream - Event-Driven Course Platform & Kafka Telemetry System

A modern, high-performance **React 19 + Vite** landing page and event telemetry client designed to interact with a **Java Spring Boot + Apache Kafka** Event-Driven Architecture.

Featuring a glassmorphic dark design system, an interactive **Kafka Event Dispatcher Simulator**, real-time **Telemetry Console Log Drawer**, and comprehensive microservice event schema dispatches.

---

## 🏗️ Architecture & Data Flow Diagram

```text
+-----------------------------------------------------------------------------------+
|                                 REACT FRONTEND                                    |
|                               (Port 5173 / Client)                                |
|                                                                                   |
|  [ Buy Course Button ] ----> emitEvent('userClick', { ... })                       |
|                                    |                                              |
|  [ Event Producer UI ] ----> emitEvent(eventType, data)                           |
+------------------------------------+----------------------------------------------+
                                     |
                                     |  HTTP POST http://localhost:8080/producer/event
                                     |  Header: Content-Type: application/json
                                     v
+-----------------------------------------------------------------------------------+
|                            JAVA SPRING BOOT PRODUCER API                          |
|                                (Port 8080 / Service)                              |
|                                                                                   |
|  @PostMapping("/producer/event")                                                  |
|  ProducerController.java  -------> EventProducer.sendEvent(EventMessage)          |
+------------------------------------+----------------------------------------------+
                                     |
                                     |  Publish EventMessage Record (JsonSerializer)
                                     v
+-----------------------------------------------------------------------------------+
|                              APACHE KAFKA EVENT BROKER                            |
|                            (Port 9092 / Topic Cluster)                            |
|                                                                                   |
|   Topic: testy                                                                    |
|   ├── USER_REGISTERED                                                             |
|   ├── ORDER_CREATED / ORDER_CANCELLED                                             |
|   ├── PAYMENT_COMPLETED / PAYMENT_FAILED                                          |
|   └── userClick                                                                   |
+------------------------------------+----------------------------------------------+
                                     |
                                     |  @KafkaListener(topics = "testy", groupId = "...")
                                     v
+-----------------------------------------------------------------------------------+
|                              DOWNSTREAM CONSUMERS                                 |
|                                                                                   |
|   ├── Analytics Event Consumer  --> Increments Prometheus counter                 |
|   ├── Notification Consumer     --> Routes email / SMS alerts                     |
|   ├── Order Event Consumer      --> Processes order state lifecycle               |
|   └── Payment Event Consumer    --> Processes payment transaction status          |
+-----------------------------------------------------------------------------------+
```

---

## ⚡ Key Features

- **💎 Glassmorphic Dark UI**: Premium typography (*Outfit*, *Plus Jakarta Sans*, *JetBrains Mono*), ambient background glows, responsive dynamic card grids, and smooth micro-animations.
- **📡 Live Telemetry Console Drawer**: Interactive terminal drawer displaying real-time outgoing HTTP dispatches, payload contents, pending loader states, HTTP status codes, and latency timing.
- **⚙️ Interactive Microservice Event Dispatcher**: Embedded simulator allowing direct dispatch of synthetic domain events for 4 key microservices:
  - 👤 **User Service**: `USER_REGISTERED`
  - 🛒 **Order Service**: `ORDER_CREATED`, `ORDER_CANCELLED`
  - 💳 **Payment Service**: `PAYMENT_COMPLETED`, `PAYMENT_FAILED`
  - 📊 **Analytics Telemetry**: `userClick`
- **🔔 Interactive Toast System**: Floating alerts providing instant feedback for HTTP dispatch outcomes, connection errors, and payload validation.
- **🔄 Architecture Explainer Tabbed Section**: Interactive tabbed view explaining Frontend emitter code, Spring Boot ProducerController code, and system event flows.

---

## 📡 API Endpoint & Data Schemas

### 1. HTTP Endpoint Specification

| Attribute | Specification |
| :--- | :--- |
| **Method** | `POST` |
| **URL** | `http://localhost:8080/producer/event` |
| **Content-Type** | `application/json` |
| **CORS Access** | Allowed (`@CrossOrigin(origins = "*")`) |

---

### 2. Event Payload Schemas (`EventRequest`)

#### A. Telemetry Click Event (`userClick`)
```json
{
  "eventType": "userClick",
  "data": {
    "action": "userClick",
    "button": "Buy a course"
  }
}
```

#### B. User Service Event (`USER_REGISTERED`)
```json
{
  "eventType": "USER_REGISTERED",
  "data": {
    "name": "Bishal",
    "email": "user@example.com"
  }
}
```

#### C. Order Service Event (`ORDER_CREATED`)
```json
{
  "eventType": "ORDER_CREATED",
  "data": {
    "courseId": "java-kafka-stream",
    "amount": 149
  }
}
```

#### D. Payment Service Event (`PAYMENT_COMPLETED`)
```json
{
  "eventType": "PAYMENT_COMPLETED",
  "data": {
    "amount": 149,
    "method": "CREDIT_CARD"
  }
}
```

---

## 📁 Project Directory Structure

```text
Landing-Page/
├── public/
│   ├── course_fullstack.jpg        # Course hero thumbnail
│   ├── course_java_kafka.jpg       # Java Kafka course thumbnail
│   ├── course_uiux_design.jpg      # UI/UX course thumbnail
│   ├── favicon.svg                 # Brand favicon
│   └── icons.svg                   # SVG icon assets
├── src/
│   ├── components/
│   │   ├── ArchitectureExplainer.jsx # Visual tabbed architecture section
│   │   ├── CourseCard.jsx            # Dynamic course card component
│   │   ├── CourseCatalog.jsx         # Course grid container
│   │   ├── EventConsole.jsx          # Live event terminal log drawer
│   │   ├── EventProducer.jsx         # Interactive Kafka event producer UI
│   │   ├── Footer.jsx                # Page footer component
│   │   ├── Header.jsx                # Header bar & live counter badge
│   │   ├── Hero.jsx                  # Hero section with CTA trigger
│   │   └── Toast.jsx                 # Toast notification component
│   ├── config/
│   │   └── eventDefinitions.js       # Microservice event schema configurations
│   ├── App.css                       # Application design system & layout styles
│   ├── App.jsx                       # Root React component
│   ├── index.css                     # Base styling, variables & reset
│   ├── LandingPage.jsx               # Main state manager & emitEvent handler
│   └── main.jsx                      # Vite entry point
├── index.html                        # HTML root template with Google Fonts
├── package.json                      # Project dependencies & npm scripts
└── vite.config.js                    # Vite dev server configuration
```

---

## 🛠️ Quickstart & Local Setup

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### Steps to Run Frontend

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start Vite development server**:
   ```bash
   npm run dev
   ```
   Open your browser at [http://localhost:5173](http://localhost:5173).

3. **Build Production Bundle**:
   ```bash
   npm run build
   ```

---

## ☕ Java Spring Boot Integration Guide

To process requests dispatched from this React frontend, configure a Spring Boot application running on port `8080`.

### 1. Request DTO Record (`EventRequest.java`)
```java
package org.example.model;

public record EventRequest(
    EventType eventType,
    Object data
) {}
```

### 2. Spring Boot REST Controller (`ProducerController.java`)
```java
package org.example.controller;

import org.example.model.EventMessage;
import org.example.model.EventRequest;
import org.example.model.EventType;
import org.example.producer.EventProducer;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/producer")
@CrossOrigin(origins = "*") // Allows request from React frontend (http://localhost:5173)
public class ProducerController {

    private final EventProducer eventProducer;

    public ProducerController(EventProducer eventProducer) {
        this.eventProducer = eventProducer;
    }

    @PostMapping("/event")
    public void sendEventToKafka(@RequestBody EventRequest eventRequest) {
        EventType eventType = eventRequest.eventType();

        EventMessage eventMessage = EventMessage.create(
                eventType,
                "ProducerController",
                eventRequest.data()
        );

        eventProducer.sendEvent(eventMessage);
    }
}
```

---

## 📜 License

Distributed under the MIT License.
