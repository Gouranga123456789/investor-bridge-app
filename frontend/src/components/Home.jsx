import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

function Home() {
  const token = localStorage.getItem('token');

  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Connect. Fund. Grow.</h1>
        <p className="hero-subtitle">
          The bridge between visionary entrepreneurs and strategic investors.
        </p>
        <div className="hero-cta">
          {token ? (
            <Link to="/dashboard" className="btn-primary">
              Go to Dashboard
            </Link>
          ) : (
            <Link to="/register" className="btn-primary">
              Get Started
            </Link>
          )}
        </div>
      </section>

      <section className="features-section">
        <h2>Who is this for?</h2>
        <div className="feature-cards-grid">
          <div className="feature-card">
            <span className="feature-icon">🚀</span>
            <h3>Entrepreneurs</h3>
            <p>
              Have a brilliant idea? Post your proposal and get in front of
              investors ready to fund the next big thing.
            </p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💰</span>
            <h3>Investors</h3>
            <p>
              Discover curated, high-potential business proposals. Filter by
              industry and find your next successful venture.
            </p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🤝</span>
            <h3>Advisors & Bankers</h3>
            <p>
              Offer your expertise. Connect with new businesses and provide
              consulting or financial loan services.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;