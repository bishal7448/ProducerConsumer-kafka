import React from 'react';

function EventConsole({ logs, onClearLogs, onTestClick }) {
  return (
    <section id="telemetry" className="telemetry-section">
      <div className="section-header">
        <span className="section-subtitle">Real-time Telemetry Monitor</span>
        <h2 className="section-title">Live Event Dispatch Console</h2>
        <p className="section-description">
          Monitor HTTP <code>POST</code> requests sent to <code>http://localhost:8080/producer/event</code> in real time.
        </p>
      </div>

      <div className="console-wrapper">
        <div className="console-toolbar">
          <div className="console-title">
            <span className="terminal-dot red"></span>
            <span className="terminal-dot yellow"></span>
            <span className="terminal-dot green"></span>
            <span className="console-name">producer-event-stream.log</span>
          </div>

          <div className="console-controls">
            <button className="console-action-btn" onClick={onTestClick}>
              ▶ Trigger Test Event
            </button>
            <button className="console-action-btn secondary" onClick={onClearLogs}>
              🧹 Clear Console
            </button>
          </div>
        </div>

        <div className="console-body">
          {logs.length === 0 ? (
            <div className="empty-console">
              <span className="empty-icon">📡</span>
              <p>No events recorded yet. Click <strong>"Buy a course"</strong> above to dispatch an event!</p>
            </div>
          ) : (
            <div className="log-entries">
              {logs.map((log) => (
                <div key={log.id} className={`log-entry ${log.status.toLowerCase()}`}>
                  <span className="log-timestamp">[{log.time}]</span>
                  <span className={`log-badge ${log.status.toLowerCase()}`}>{log.status}</span>
                  <span className="log-method">POST</span>
                  <span className="log-url">http://localhost:8080/producer/event</span>
                  <span className="log-payload">body: <code>{JSON.stringify(log.payload)}</code></span>
                  {log.message && <span className="log-msg">({log.message})</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="console-footer">
          <span>Target Host: <code>http://localhost:8080</code></span>
          <span>Content-Type: <code>application/json</code></span>
        </div>
      </div>
    </section>
  );
}

export default EventConsole;
