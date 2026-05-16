import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarCheck, FileText, ShieldCheck, Stethoscope, Users } from 'lucide-react';

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
            <div className="badge badge-primary hero-badge">Dental CRM Admin Workspace</div>
            <h1 className="hero-title">
              Manage every patient visit from one calm, clinical dashboard.
            </h1>
            <p className="hero-description">
              {clinicName} can track patient files, medical history, prescriptions, appointments, and clinic settings in one dynamic workspace.
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

        <section className="home-components">
          <article className="home-component">
            <div className="component-icon bg-primary-light text-primary"><Users size={22} /></div>
            <h3>Dynamic Patient Records</h3>
            <p>Add unlimited patients with contact details, allergies, blood group, emergency contacts, and clinical notes.</p>
          </article>
          <article className="home-component">
            <div className="component-icon bg-success-light text-success"><FileText size={22} /></div>
            <h3>Visit Timeline</h3>
            <p>Log procedures, diagnoses, tooth areas, treatment notes, and next steps directly inside each patient file.</p>
          </article>
          <article className="home-component">
            <div className="component-icon bg-warning-light text-warning"><CalendarCheck size={22} /></div>
            <h3>Appointment Flow</h3>
            <p>Schedule visits, change status, and keep each appointment connected to the right patient history.</p>
          </article>
          <article className="home-component">
            <div className="component-icon bg-danger-light text-danger"><ShieldCheck size={22} /></div>
            <h3>Care Safety</h3>
            <p>Keep allergies, active medications, and care instructions visible before treatment decisions.</p>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Home;
