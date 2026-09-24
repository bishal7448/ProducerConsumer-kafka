import React from 'react';

function Header({ eventCount, onBuyCourseClick }) {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="brand-logo">
          <div className="logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="brand-text">
            <span className="brand-title">EduStream</span>
            <span className="brand-subtitle">Course Platform</span>
          </div>
        </div>

        <nav className="nav-links">
          <a href="#courses" className="nav-link">Courses</a>
          <a href="#producer" className="nav-link">Event Dispatcher</a>
          <a href="#architecture" className="nav-link">Architecture</a>
          <a href="#telemetry" className="nav-link">Telemetry Console</a>
        </nav>

        <div className="header-actions">
          <div className="telemetry-badge" title="Target Endpoint: http://localhost:8080/producer/event">
            <span className="pulse-dot"></span>
            <span className="badge-label">Events Fired: <strong>{eventCount}</strong></span>
          </div>
          <button className="primary-btn header-cta" onClick={onBuyCourseClick}>
            Buy a course
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
