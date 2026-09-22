import React from 'react';

function Hero({ onBuyCourseClick }) {
  return (
    <section className="hero-section">
      <div className="hero-backdrop"></div>
      <div className="hero-content">
        <div className="pill-badge">
          <span className="sparkle">✨</span> Event-Driven Architecture Platform
        </div>
        
        <h1 className="hero-title">Welcome to our Course Platform</h1>
        
        <p className="hero-description">
          Master cutting-edge software engineering skills with interactive projects. Every purchase action is seamlessly integrated with your Java event producer server at <code>http://localhost:8080/producer/event</code>.
        </p>

        <div className="hero-actions">
          <button className="cta-button primary-cta" onClick={onBuyCourseClick}>
            <span>Buy a course</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
          
          <a href="#architecture" className="cta-button secondary-cta">
            <span>Explore Architecture</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 9l-7 7-7-7"/>
            </svg>
          </a>
        </div>

        <div className="tech-stack-row">
          <span className="stack-label">Powered by:</span>
          <div className="stack-items">
            <span className="stack-chip">React 19</span>
            <span className="stack-chip">Vite</span>
            <span className="stack-chip">Java Producer API</span>
            <span className="stack-chip">Event Stream</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
