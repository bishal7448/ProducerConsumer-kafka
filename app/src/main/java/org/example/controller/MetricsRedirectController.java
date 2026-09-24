package org.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MetricsRedirectController {

    /**
     * Forwards requests from /metrics directly to Spring Boot Actuator's prometheus endpoint (/actuator/prometheus).
     */
    @GetMapping("/metrics")
    public String forwardToPrometheus() {
        return "forward:/actuator/prometheus";
    }
}
