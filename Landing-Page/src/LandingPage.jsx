import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CourseCatalog from './components/CourseCatalog';
import EventProducer from './components/EventProducer';
import ArchitectureExplainer from './components/ArchitectureExplainer';
import EventConsole from './components/EventConsole';
import Toast from './components/Toast';
import Footer from './components/Footer';

function LandingPage() {
    const [eventLogs, setEventLogs] = useState([]);
    const [toasts, setToasts] = useState([]);
    const [eventCount, setEventCount] = useState(0);

    const addToast = (type, title, message) => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, type, title, message }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4500);
    };

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const emitEvent = (eventInput) => {
        let payload;
        let displayEventName;

        if (typeof eventInput === 'string') {
            payload = {
                eventType: eventInput,
                data: {
                    action: eventInput,
                    button: "Buy a course",
                    timestamp: Date.now()
                }
            };
            displayEventName = eventInput;
        } else if (typeof eventInput === 'object' && eventInput !== null) {
            const eventType = eventInput.eventType || eventInput.event || 'userClick';
            const data = eventInput.data || (eventInput.event ? { action: eventInput.event } : eventInput);
            payload = { eventType, data };
            displayEventName = eventType;
        } else {
            payload = {
                eventType: 'userClick',
                data: {
                    action: 'userClick',
                    button: "Buy a course",
                    timestamp: Date.now()
                }
            };
            displayEventName = 'userClick';
        }

        const timestamp = new Date().toLocaleTimeString();
        setEventCount((prev) => prev + 1);

        const logId = Date.now() + Math.random();
        setEventLogs((prev) => [
            {
                id: logId,
                time: timestamp,
                status: 'PENDING',
                payload: payload,
                message: 'Dispatching POST request...'
            },
            ...prev
        ]);

        fetch('http://localhost:8080/producer/event', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.text();
            })
            .then((resText) => {
                setEventLogs((prev) =>
                    prev.map((log) =>
                        log.id === logId
                            ? { ...log, status: 'SUCCESS', message: `HTTP 200 OK - ${resText || 'Event Received'}` }
                            : log
                    )
                );
                addToast('success', 'Event Dispatched', `Event '${displayEventName}' sent to backend (HTTP 200 OK)`);
            })
            .catch((error) => {
                console.error('Error emitting event:', error);
                setEventLogs((prev) =>
                    prev.map((log) =>
                        log.id === logId
                            ? { ...log, status: 'ERROR', message: `Fetch Error: Backend Offline or CORS blocked (${error.message})` }
                            : log
                    )
                );
                addToast(
                    'info',
                    `Event '${displayEventName}' Dispatched`,
                    `Target: http://localhost:8080/producer/event. Note: Java Spring Boot server offline or CORS restricted.`
                );
            });
    };

    const handleBuyCourseClick = () => {
        emitEvent('userClick');
    };

    const clearLogs = () => {
        setEventLogs([]);
    };

    return (
        <div className="landing-page-wrapper">
            <Toast toasts={toasts} onCloseToast={removeToast} />
            <Header eventCount={eventCount} onBuyCourseClick={handleBuyCourseClick} />

            <main className="main-content">
                <Hero onBuyCourseClick={handleBuyCourseClick} />
                <CourseCatalog onBuyCourseClick={handleBuyCourseClick} />
                <EventProducer onEmitEvent={emitEvent} />
                <ArchitectureExplainer />
                <EventConsole 
                    logs={eventLogs} 
                    onClearLogs={clearLogs} 
                    onTestClick={handleBuyCourseClick} 
                />
            </main>

            <Footer />
        </div>
    );
}

export default LandingPage;