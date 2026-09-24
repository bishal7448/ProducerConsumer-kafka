import React, { useState } from 'react';

function ArchitectureExplainer() {
  const [activeTab, setActiveTab] = useState('flow');

  return (
    <section id="architecture" className="architecture-section">
      <div className="section-header">
        <span className="section-subtitle">System Overview & Explanations</span>
        <h2 className="section-title">How the Event Architecture Works</h2>
        <p className="section-description">
          Understanding the communication pipeline between the React landing page and the Java event producer backend.
        </p>
      </div>

      <div className="architecture-tabs">
        <button 
          className={`tab-btn ${activeTab === 'flow' ? 'active' : ''}`}
          onClick={() => setActiveTab('flow')}
        >
          🔄 Event Flow Protocol
        </button>
        <button 
          className={`tab-btn ${activeTab === 'frontend' ? 'active' : ''}`}
          onClick={() => setActiveTab('frontend')}
        >
          ⚛️ Frontend Emitter
        </button>
        <button 
          className={`tab-btn ${activeTab === 'backend' ? 'active' : ''}`}
          onClick={() => setActiveTab('backend')}
        >
          ☕ Java Backend Producer
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'flow' && (
          <div className="flow-diagram-container">
            <div className="diagram-steps">
              <div className="step-card">
                <div className="step-number">01</div>
                <div className="step-icon">🖱️</div>
                <h4>User Interaction</h4>
                <p>User clicks the <strong>"Buy a course"</strong> button on the React frontend landing page.</p>
              </div>

              <div className="step-arrow">➔</div>

              <div className="step-card highlight">
                <div className="step-number">02</div>
                <div className="step-icon">📡</div>
                <h4>HTTP POST Event</h4>
                <p>Frontend executes <code>emitEvent('userClick')</code> dispatching payload <code>{`{ eventType: "userClick", data: { ... } }`}</code> to <code>http://localhost:8080/producer/event</code>.</p>
              </div>

              <div className="step-arrow">➔</div>

              <div className="step-card">
                <div className="step-number">03</div>
                <div className="step-icon">☕</div>
                <h4>Java Producer API</h4>
                <p>Java Spring Boot server receives JSON at <code>/producer/event</code> endpoint and processes the payload.</p>
              </div>

              <div className="step-arrow">➔</div>

              <div className="step-card">
                <div className="step-number">04</div>
                <div className="step-icon">⚡</div>
                <h4>Event Stream / Kafka</h4>
                <p>Java server pushes event to Kafka topic or analytics engine for course telemetry & conversion tracking.</p>
              </div>
            </div>

            <div className="explanation-box">
              💡 <strong>Why this architecture?</strong> Decoupling user actions from processing queues ensures low-latency UI responsiveness while maintaining reliable telemetry logging on the backend.
            </div>
          </div>
        )}

        {activeTab === 'frontend' && (
          <div className="code-snippet-container">
            <div className="snippet-header">
              <span>src/LandingPage.jsx (Frontend Event Dispatcher)</span>
              <span className="lang-tag">JavaScript / React</span>
            </div>
            <pre className="code-block">
{`const emitEvent = (eventType, data = {}) => {
    // Send standard event object to Java Spring Boot backend
    fetch('http://localhost:8080/producer/event', {
        method : 'POST',
        headers : {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            eventType: eventType,
            data: data
        })
    }).then(response => {
        if(!response.ok) {
            throw new Error('Failed to emit event...')
        }
    }).catch(error => {
        console.error('Error emitting event:', error)
    })
}

const handleBuyCourseClick = () => {
    // Emit standardized userClick event when "Buy a course" is clicked
    emitEvent('userClick', { action: 'userClick', button: 'Buy a course' })
}`}
            </pre>
          </div>
        )}

        {activeTab === 'backend' && (
          <div className="code-snippet-container">
            <div className="snippet-header">
              <span>ProducerController.java (Expected Java Backend Controller)</span>
              <span className="lang-tag">Java / Spring Boot</span>
            </div>
            <pre className="code-block">
{`@RestController
@RequestMapping("/producer")
@CrossOrigin(origins = "*") // Allows request from React frontend
public class ProducerController {

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    @PostMapping("/event")
    public ResponseEntity<String> receiveEvent(@RequestBody EventRequest request) {
        String eventType = request.getEventType();
        Object data = request.getData();
        
        System.out.println("Received event: " + eventType + " with data: " + data);
        
        // Broadcast to Kafka topic or message queue
        kafkaTemplate.send("course-user-clicks", eventType, data);
        
        return ResponseEntity.ok("Event received successfully");
    }
}`}
            </pre>
          </div>
        )}
      </div>
    </section>
  );
}

export default ArchitectureExplainer;
