import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, CalendarCheck, FileText, Pill, ShieldCheck, Stethoscope, Users } from 'lucide-react';

const Home = ({ data }) => {
  const navigate = useNavigate();
  const clinic = data?.clinic || {};
  const clinicName = clinic.name || 'Dental CRM';
  const totalVisits = Object.values(data?.history || {}).flat().length;
  const totalMedications = Object.values(data?.medications || {}).flat().length;
  const nextAppointment = [...(data?.appointments || [])]
    .filter((appointment) => appointment.status !== 'Cancelled')
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`))[0];

  const metrics = [
    { label: 'Patients', value: data?.patients?.length || 0, icon: Users, tone: 'primary' },
    { label: 'Appointments', value: data?.appointments?.length || 0, icon: CalendarCheck, tone: 'warning' },
    { label: 'Visit Records', value: totalVisits, icon: FileText, tone: 'success' },
    { label: 'Medications', value: totalMedications, icon: Pill, tone: 'danger' }
  ];

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

          <div className="clinic-preview animate-fade-in">
            <div className="preview-header">
              <div>
                <span>Today at {clinicName}</span>
                <strong>{clinic.openTime || '09:00'} - {clinic.closeTime || '18:00'}</strong>
              </div>
              <div className="preview-pulse"><Activity size={18} /></div>
            </div>

            <div className="preview-metrics">
              {metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div className="preview-metric" key={metric.label}>
                    <div className={`metric-icon bg-${metric.tone}-light text-${metric.tone}`}>
                      <Icon size={18} />
                    </div>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="preview-panel">
              <div className="preview-row">
                <span>Next appointment</span>
                <strong>{nextAppointment ? `${nextAppointment.date} ${nextAppointment.time}` : 'Not scheduled'}</strong>
              </div>
              <div className="preview-row">
                <span>Default dentist</span>
                <strong>{clinic.defaultDentist || 'Not set'}</strong>
              </div>
              <div className="preview-row">
                <span>Clinic phone</span>
                <strong>{clinic.phone || 'Not set'}</strong>
              </div>
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
