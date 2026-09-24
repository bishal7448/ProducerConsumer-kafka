import React from 'react';
import { eventDefinitions } from '../config/eventDefinitions';

function generateEventPayload(eventType) {
    const timestamp = Date.now();
    const randomId = Math.floor(Math.random() * 9000) + 1000;

    switch (eventType) {
        case "USER_REGISTERED":
            return {
                eventType: "USER_REGISTERED",
                data: {
                    userId: `USER-${randomId}`,
                    name: "Bishal",
                    email: "user@example.com",
                    timestamp
                }
            };

        case "ORDER_CREATED":
            return {
                eventType: "ORDER_CREATED",
                data: {
                    orderId: `ORD-${timestamp}`,
                    userId: `USER-${randomId}`,
                    amount: Math.floor(Math.random() * 5000) + 500,
                    currency: "USD"
                }
            };

        case "ORDER_CANCELLED":
            return {
                eventType: "ORDER_CANCELLED",
                data: {
                    orderId: `ORD-${timestamp}`,
                    reason: "Customer requested cancellation",
                    timestamp
                }
            };

        case "PAYMENT_COMPLETED":
            return {
                eventType: "PAYMENT_COMPLETED",
                data: {
                    paymentId: `PAY-${timestamp}`,
                    orderId: `ORD-${randomId}`,
                    amount: Math.floor(Math.random() * 5000) + 500,
                    status: "SUCCESS"
                }
            };

        case "PAYMENT_FAILED":
            return {
                eventType: "PAYMENT_FAILED",
                data: {
                    paymentId: `PAY-${timestamp}`,
                    orderId: `ORD-${randomId}`,
                    reason: "Insufficient balance",
                    status: "FAILED"
                }
            };

        case "userClick":
            return {
                eventType: "userClick",
                data: {
                    action: "userClick",
                    button: "Buy a course",
                    timestamp
                }
            };

        default:
            return {
                eventType: eventType,
                data: {
                    action: eventType,
                    timestamp
                }
            };
    }
}

function EventProducer({ onEmitEvent }) {
    const handleProduceEvent = (eventType) => {
        const payload = generateEventPayload(eventType);
        if (onEmitEvent) {
            onEmitEvent(payload);
        }
    };

    return (
        <section id="producer" className="producer-section">
            <div className="section-header">
                <span className="section-subtitle">Microservice Event Simulator</span>
                <h2 className="section-title">Kafka Event Dispatcher</h2>
                <p className="section-description">
                    Simulate real-world domain events from distinct microservices (User, Order, Payment, Analytics) and dispatch them directly to the Java Spring Boot Producer.
                </p>
            </div>

            <div className="services-grid">
                {eventDefinitions.map((service) => (
                    <div className="service-card" key={service.service}>
                        <div className="service-card-header">
                            <span className="service-icon">{service.icon || "⚙️"}</span>
                            <div>
                                <h3 className="service-title">{service.service}</h3>
                                <p className="service-desc">{service.description}</p>
                            </div>
                        </div>

                        <div className="event-buttons">
                            {service.events.map((event) => (
                                <button
                                    key={event.type}
                                    className={`producer-btn ${
                                        event.type.includes('FAILED') || event.type.includes('CANCELLED') ? 'btn-danger' : 'btn-primary'
                                    }`}
                                    onClick={() => handleProduceEvent(event.type)}
                                >
                                    <span className="btn-badge">{event.badge}</span>
                                    <span className="btn-label">{event.label}</span>
                                    <code className="btn-code">{event.type}</code>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default EventProducer;