import React from 'react';

function Footer() {
  return (
    <footer id="readme-info" className="site-footer">
      <div className="footer-container">
        <div className="footer-column brand-col">
          <div className="brand-logo">
            <div className="logo-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <span className="brand-title">Course Platform</span>
          </div>
          <p className="footer-bio">
            An event-driven learning platform built with React 19, Vite, and Java Producer integration.
          </p>
        </div>

        <div className="footer-column">
          <h4>Navigation</h4>
          <ul>
            <li><a href="#courses">Courses</a></li>
            <li><a href="#architecture">Architecture</a></li>
            <li><a href="#telemetry">Telemetry Console</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Event Producer API</h4>
          <ul>
            <li>Endpoint: <code>POST /producer/event</code></li>
            <li>Target URL: <code>http://localhost:8080/producer/event</code></li>
            <li>Default Event: <code>userClick</code></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Course Platform. All rights reserved. Event-driven telemetry architecture.</p>
      </div>
    </footer>
  );
}

export default Footer;
