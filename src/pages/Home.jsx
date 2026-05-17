import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Stethoscope } from 'lucide-react';

const Home = ({ data }) => {
  const navigate = useNavigate();
  const clinic = data?.clinic || {};
  const clinicName = clinic.name || 'Dental CRM';

  return (
    <div className="home-container">
      <nav className="home-nav">
        <div className="logo-brand">
          <div className="logo-icon-wrapper">
            <Stethoscope size={24} />
          </div>
          <span className="logo-text">{clinicName}</span>
        </div>
        <div className="nav-actions">
          <button className="btn btn-primary" onClick={() => navigate('/login')}>
            Admin Login <ArrowRight size={16} />
          </button>
        </div>
      </nav>

      <main className="home-main">
        <section className="home-hero">
          <div className="hero-copy animate-fade-in">
            <div className="badge badge-primary hero-badge">Clinical workspace for modern dental teams</div>
            <h1 className="hero-title">
              Run patient care from one <span className="text-gradient">light, organized CRM.</span>
            </h1>
            <p className="hero-description">
              {clinicName} can manage patient files, appointments, prescriptions, treatment notes, and clinic settings without losing the calm feel of a well-run practice.
            </p>
            <div className="hero-buttons">
              <button className="btn btn-primary btn-lg" onClick={() => navigate('/login')}>
                Access Dashboard <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="hero-visual animate-fade-in">
            <div className="dental-photo-card">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80"
                alt="Modern dental clinic treatment room with digital patient management workspace"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
