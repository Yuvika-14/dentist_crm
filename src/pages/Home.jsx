import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CalendarCheck,
  Clock,
  DatabaseBackup,
  FileCheck2,
  FileText,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Pill,
  ShieldCheck,
  SmilePlus,
  Stethoscope,
  UploadCloud
} from 'lucide-react';

const Home = ({ data }) => {
  const navigate = useNavigate();
  const clinic = {
    name: 'My dentist',
    phone: '(817) 329-6000',
    email: 'share@startdentistry.com',
    address: '2100 W Northwest Hwy #204, Grapevine, TX 76051',
    ...(data?.clinic || {})
  };
  const clinicName = clinic.name || 'My dentist';
  const phone = clinic.phone || '(817) 329-6000';
  const email = clinic.email || 'share@startdentistry.com';
  const address = clinic.address || '2100 W Northwest Hwy #204, Grapevine, TX 76051';
  const mapQuery = encodeURIComponent(address);
  const featureCards = [
    {
      icon: <FileText size={24} />,
      title: 'Electronic Health Records',
      text: 'Digital charts for dental history, past treatments, allergies, consent status, and visit notes.'
    },
    {
      icon: <Pill size={24} />,
      title: 'Smart Prescriptions',
      text: 'Generate, track, and send digital prescriptions while keeping allergy warnings visible.'
    },
    {
      icon: <SmilePlus size={24} />,
      title: 'Visual Treatment Planning',
      text: 'Map fillings, root canals, extractions, and follow-up procedures on a clear care timeline.'
    },
    {
      icon: <UploadCloud size={24} />,
      title: 'Secure Document Uploads',
      text: 'Store X-rays, lab reports, intake forms, and consent PDFs in an encrypted cloud vault.'
    }
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
        <div className="home-nav-links">
          <a href="#features">Features</a>
          <a href="#workflow">Workflow</a>
          <a href="#contact">Contact us</a>
          <a href="#security">Security</a>
          <a href="#contact">Location</a>
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
            <div className="patient-dashboard-loop hero-patient-loop" aria-label="Looping patient dashboard demo">
              <div className="loop-window-bar">
                <span></span><span></span><span></span>
                <strong>Patients Dashboard</strong>
                <em>Looping demo</em>
              </div>
              <div className="loop-dashboard-screen">
                <aside>
                  <b>MD</b>
                  <span className="active">Patients</span>
                  <span>Appointments</span>
                  <span>Prescriptions</span>
                  <span>Settings</span>
                </aside>
                <section>
                  <div className="loop-demo-cursor" aria-hidden="true"></div>
                  <div className="loop-demo-header">
                    <div>
                      <small>Patient command center</small>
                      <h3>Patient Directory</h3>
                      <p>Profiles, visits, risks, and follow-ups in one view.</p>
                    </div>
                    <button type="button">Add Patient</button>
                  </div>
                  <div className="loop-demo-stats">
                    <article><strong>5</strong><span>Total patients</span></article>
                    <article><strong>2</strong><span>Upcoming visits</span></article>
                    <article><strong>3</strong><span>Allergy flags</span></article>
                  </div>
                  <div className="loop-demo-search">Search by name, phone, email, or treatment status...</div>
                  <div className="loop-demo-table">
                    <div><strong>Aarav Mehta</strong><span>Root canal follow-up</span><em>Active</em></div>
                    <div><strong>Sofia Rivera</strong><span>Periodontal maintenance</span><em>Review</em></div>
                    <div><strong>Emma Wilson</strong><span>Crown review</span><em>Checked in</em></div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        <section className="home-info-strip" aria-label="Clinic highlights">
          <div>
            <ShieldCheck size={20} />
            <span>Family Dentistry</span>
          </div>
          <div>
            <Clock size={20} />
            <span>Evening & Weekend Hours</span>
          </div>
          <div>
            <Stethoscope size={20} />
            <span>Complete Dental Care</span>
          </div>
        </section>

        <section className="homepage-section" id="features">
          <div className="homepage-section-heading">
            <span className="section-kicker">Features & Capabilities</span>
            <h2>Everything the clinic team needs to manage care</h2>
            <p>Built around records, prescriptions, treatment planning, and secure documents.</p>
          </div>
          <div className="feature-capability-grid">
            {featureCards.map((feature) => (
              <article key={feature.title}>
                <span>{feature.icon}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="workflow-section homepage-section" id="workflow">
          <div className="homepage-section-heading">
            <span className="section-kicker">How It Works</span>
            <h2>A simple clinical workflow from intake to follow-up</h2>
          </div>
          <div className="workflow-steps">
            <article><strong>1</strong><h3>Quick Intake</h3><p>Onboard a new patient via a digital form in under 2 minutes.</p></article>
            <article><strong>2</strong><h3>Real-time Charting</h3><p>Update treatment notes and medical history mid-appointment seamlessly.</p></article>
            <article><strong>3</strong><h3>Automated Follow-ups</h3><p>Send prescriptions and next-appointment reminders automatically.</p></article>
          </div>
        </section>

        <section className="homepage-section product-walkthrough" id="walkthrough">
          <div className="homepage-section-heading">
            <span className="section-kicker">Interactive Product Walkthrough</span>
            <h2>The software itself is the hero</h2>
            <p>Doctors can scan the patient timeline, update treatment plans, send prescriptions, and review secure uploads from one workspace.</p>
          </div>
          <div className="walkthrough-grid">
            <article><CalendarCheck size={22} /><h3>Patient Timeline</h3><p>Chronological visits, procedures, prescriptions, and document activity.</p></article>
            <article><Pill size={22} /><h3>Prescription Queue</h3><p>Track status and send medication instructions without switching tools.</p></article>
            <article><UploadCloud size={22} /><h3>Secure Upload Vault</h3><p>Link encrypted X-rays, lab reports, and forms to patient records.</p></article>
          </div>
        </section>

        <section className="security-compliance-banner" id="security">
          <div>
            <span className="section-kicker">Security & Compliance</span>
            <h2>Designed for sensitive medical data</h2>
          </div>
          <div className="security-badges">
            <span><ShieldCheck size={16} /> HIPAA Compliance</span>
            <span><LockKeyhole size={16} /> End-to-end encryption</span>
            <span><DatabaseBackup size={16} /> Secure cloud backups</span>
            <span><FileCheck2 size={16} /> Activity audit trail</span>
          </div>
        </section>

        <section className="homepage-section testimonials-section">
          <div className="homepage-section-heading">
            <span className="section-kicker">Social Proof</span>
            <h2>Trusted by busy dental teams</h2>
          </div>
          <div className="testimonial-grid">
            <article><p>"My dentist cut our administrative charting time in half."</p><strong>Dr. Sarah Jenkins</strong><span>Lead Dentist</span></article>
            <article><p>"The patient timeline helps doctors understand a case before entering the room."</p><strong>Priya Mehta</strong><span>Clinic Administrator</span></article>
            <article><p>"Prescriptions and document uploads finally feel connected to treatment planning."</p><strong>Dr. Mateo Ruiz</strong><span>Endodontist</span></article>
          </div>
        </section>
      </main>

      <footer className="home-footer" id="contact">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo-brand">
              <div className="logo-icon-wrapper">
                <Stethoscope size={22} />
              </div>
              <span className="logo-text">{clinicName}</span>
            </div>
            <p>
              Family dental care in Grapevine, Texas with a calm, organized clinical workflow for every visit.
            </p>
          </div>

          <div className="footer-contact">
            <h2>Visit {clinicName}</h2>
            <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`} target="_blank" rel="noreferrer">
              <MapPin size={18} />
              <span>{address}</span>
            </a>
            <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>
              <Phone size={18} />
              <span>{phone}</span>
            </a>
            <a href={`mailto:${email}`}>
              <Mail size={18} />
              <span>{email}</span>
            </a>
          </div>

          <div className="footer-map" aria-label={`${clinicName} location map`}>
            <div className="footer-map-fallback">
              <MapPin size={22} />
              <strong>Map loading</strong>
              <span>{address}</span>
            </div>
            <iframe
              title={`${clinicName} location map`}
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="footer-bottom">
          <span>Copyright 2026 {clinicName}. All rights reserved.</span>
          <span>Secure dental CRM for records, visits, prescriptions, and patient documents.</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
