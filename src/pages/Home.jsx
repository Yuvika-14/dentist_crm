import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Activity, ShieldCheck, ArrowRight, User } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <nav className="home-nav">
        <div className="logo-brand">
          <div className="logo-icon-wrapper">
            <Stethoscope size={24} />
          </div>
          <span className="logo-text">NovaDental</span>
        </div>
        <div className="nav-actions">
          <button className="btn btn-secondary" onClick={() => navigate('/login')}>
            <User size={16} /> Patient Portal
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Admin Login <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      <main className="hero-section">
        <div className="hero-content animate-fade-in">
          <div className="badge badge-primary hero-badge">Next-Generation Clinic Management</div>
          <h1 className="hero-title">
            Transforming Dental Care <br />
            <span className="text-gradient">With Intelligent Systems</span>
          </h1>
          <p className="hero-description">
            A comprehensive, secure, and intuitive platform designed to streamline patient records, clinical visits, and medication management for modern dental professionals.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary btn-lg" onClick={() => navigate('/login')}>
              Access Dashboard
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/login')}>
              View Patient Portal
            </button>
          </div>
        </div>

        <div className="features-grid animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="feature-card">
            <div className="feature-icon bg-primary-light text-primary">
              <Activity size={24} />
            </div>
            <h3>Advanced Patient Tracking</h3>
            <p>Maintain detailed medical histories, track visits, and monitor patient progression seamlessly over time.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon bg-success-light text-success">
              <ShieldCheck size={24} />
            </div>
            <h3>Secure & Compliant</h3>
            <p>Enterprise-grade security ensuring all sensitive medical data is encrypted and strictly protected.</p>
          </div>
        </div>
      </main>

      {/* Decorative background elements */}
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
    </div>
  );
};

export default Home;
