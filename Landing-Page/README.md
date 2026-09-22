# 🎓 Course Platform - Event-Driven Landing Page

A modern, high-converting React 19 + Vite landing page for a Course Platform. Built with a rich aesthetic design system, interactive course catalog, real-time event telemetry console, and seamless integration with a Java Event Producer backend.

---

## 🚀 Key Features

- **💎 Modern UI/UX Design**: Sleek dark mode palette, glassmorphism card elevation, Google Fonts (*Outfit*, *Plus Jakarta Sans*, *JetBrains Mono*), and smooth micro-animations.
- **⚡ Preserved Core Logic**: Full backwards-compatibility with the original `emitEvent` and `handleBuyCourseClick` functions targeting `http://localhost:8080/producer/event`.
- **📡 Real-time Event Telemetry Console**: Interactive log viewer displaying live HTTP `POST` event dispatches, response status codes, payloads, and timestamps.
- **🔔 Toast Notification System**: Visual feedback alerts confirming event dispatches and connection telemetry.
- **🧩 Structured Modular Architecture**: Clean component separation (`Header`, `Hero`, `CourseCatalog`, `CourseCard`, `ArchitectureExplainer`, `EventConsole`, `Toast`, `Footer`).
- **📚 In-App Architectural Explanations**: Interactive tabbed view illustrating the full data flow from user button click to Java Spring Boot Producer and Kafka streaming pipelines.

---

## 🔄 Architecture & Data Flow

```
+-------------------+              HTTP POST /producer/event             +-------------------------+
|                   |  ------------------------------------------------> |                         |
|  React 19 Client  |      Body: { "event": "userClick" }                |   Java Spring Boot API  |
|   (Port 5173)     |                                                    |      (Port 8080)        |
|                   |  <------------------------------------------------ |                         |
+-------------------+         HTTP 200 OK / Response Telemetry           +-------------------------+
                                                                                      |
                                                                                      v
                                                                         +-------------------------+
                                                                         |  Kafka Event Stream /   |
                                                                         |   Analytics Pipeline    |
                                                                         +-------------------------+
```

### API Endpoint Specification

| Method | Endpoint | Target URL | Content-Type | Payload Body |
| :--- | :--- | :--- | :--- | :--- |
| **`POST`** | `/producer/event` | `http://localhost:8080/producer/event` | `application/json` | `{ "event": "userClick" }` |

---

## 📁 Project Directory Structure

```
Landing-Page/
├── public/
│   ├── course_fullstack.jpg      # Full-Stack course image
│   ├── course_java_kafka.jpg     # Java Kafka course image
│   ├── course_uiux_design.jpg    # UI/UX course image
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ArchitectureExplainer.jsx # Visual architecture tabbed explainer
│   │   ├── CourseCard.jsx            # Individual course card with price & CTA
│   │   ├── CourseCatalog.jsx         # Featured course grid container
│   │   ├── EventConsole.jsx          # Live event log terminal
│   │   ├── Footer.jsx                # Footer with system specs & links
│   │   ├── Header.jsx                # Navigation bar & live event counter
│   │   ├── Hero.jsx                  # Hero section & call-to-action
│   │   └── Toast.jsx                 # Toast notification system
│   ├── App.css                       # Component styling & animations
│   ├── App.jsx                       # Main App container
│   ├── index.css                     # Global variables & typography
│   ├── LandingPage.jsx               # Main page component & emitEvent handler
│   └── main.jsx                      # React entry point
├── index.html                        # HTML entry point with Google Fonts
├── package.json
├── README.md                         # Project documentation
└── vite.config.js
```

---

## 🛠️ Getting Started

### Prerequisites
- **Node.js** (v18.0.0 or later)
- **npm** (v9.0.0 or later)

### Installation & Running

1. **Clone the repository & install dependencies**:
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at [http://localhost:5173](http://localhost:5173).

3. **Build for production**:
   ```bash
   npm run build
   ```

---

## ☕ Java Backend Integration Guide

To process the events dispatched from this landing page, configure your Java Spring Boot application running on `http://localhost:8080` with the following controller:

```java
package com.example.producer.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/producer")
@CrossOrigin(origins = "*") // Enable CORS for React Dev Server
public class ProducerController {

    @PostMapping("/event")
    public ResponseEntity<String> handleEvent(@RequestBody EventRequest request) {
        System.out.println("Received telemetry event: " + request.getEvent());
        
        // Example: Forward to Kafka or event store
        // kafkaTemplate.send("course-events", request.getEvent());

        return ResponseEntity.ok("Event received successfully");
    }
}

// EventRequest POJO
class EventRequest {
    private String event;

    public String getEvent() { return event; }
    public void setEvent(String event) { this.event = event; }
}
```

---

## 📄 License

Distributed under the MIT License.
