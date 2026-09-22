import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CourseCatalog from './components/CourseCatalog';
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

    const emitEvent = (eventName) => {
        const timestamp = new Date().toLocaleTimeString();
        setEventCount((prev) => prev + 1);

        // Add log entry tracking request start
        const logId = Date.now();
        setEventLogs((prev) => [
            {
                id: logId,
                time: timestamp,
                status: 'PENDING',
                payload: { event: eventName },
                message: 'Dispatching POST request...'
            },
            ...prev
        ]);

        // Send a request to your Java server to emit an event
        fetch('http://localhost:8080/producer/event', {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({ event: eventName })
        }).then(response => {
            if(!response.ok) {
                throw new Error('Failed to emit event...')
            }
            // Update log on success
            setEventLogs((prev) =>
                prev.map((log) =>
                    log.id === logId
                        ? { ...log, status: 'SUCCESS', message: 'HTTP 200 OK - Event Received' }
                        : log
                )
            );
            addToast('success', 'Event Dispatched Successfully', `Event '${eventName}' sent to http://localhost:8080/producer/event (HTTP 200)`);
        }).catch(error => {
            console.error('Error emitting event:', error);
            // Update log on error (e.g. backend server offline or CORS error)
            setEventLogs((prev) =>
                prev.map((log) =>
                    log.id === logId
                        ? { ...log, status: 'ERROR', message: `Fetch Error: Backend Offline or CORS blocked (${error.message})` }
                        : log
                )
            );
            addToast(
                'info',
                `Event '${eventName}' Dispatched`,
                `Target: http://localhost:8080/producer/event. Note: If your Java backend is offline, start Spring Boot on port 8080.`
            );
        });
    };

    const handleBuyCourseClick = () => {
        // Emit userClick event when the "Buy a course" button is clicked
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