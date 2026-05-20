import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  DatabaseBackup,
  FileCheck2,
  FileText,
  Menu,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Pill,
  ShieldCheck,
  SmilePlus,
  Stethoscope,
  UploadCloud,
  X
} from 'lucide-react';

const Home = ({ data }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const clinic = {
    name: 'My dentist',
    phone: '(817) 329-6000',
    email: 'share@startdentistry.com',
    address: 'Rajendra market, Parsa sampatchak road, purani, near Annie Besant school, Parsa Bazar, Patna, Bihar 804453',
    ...(data?.clinic || {})
  };
  const clinicName = clinic.name || 'My dentist';
  const phone = clinic.phone || '(817) 329-6000';
  const email = clinic.email || 'share@startdentistry.com';
  const address = clinic.address || 'Rajendra market, Parsa sampatchak road, purani, near Annie Besant school, Parsa Bazar, Patna, Bihar 804453';
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' }
  ];
  const featureCards = [
    {
      icon: <FileText size={24} />,
      title: 'Electronic Health Records',
      text: 'Digital charts for dental history, past treatments, allergies, consent status, and visit notes.'
    },
    {
      icon: <Pill size={24} />,
      title: 'Smart Prescriptions',
      text: 'Prepare, review, and track prescription care plans while keeping allergy warnings visible.'
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
  const workflowSteps = [
    { title: 'Quick Intake', text: 'Onboard a new patient via a digital form in under 2 minutes.' },
    { title: 'Real-time Charting', text: 'Update treatment notes and medical history mid-appointment seamlessly.' },
    { title: 'Care Follow-ups', text: 'Prepare medication instructions and next-appointment reminders from one workflow.' }
  ];
  const reviews = [
    { quote: 'My dentist cut our administrative charting time in half.', name: 'Dr. Sarah Jenkins', role: 'Lead Dentist' },
    { quote: 'The patient timeline helps doctors understand a case before entering the room.', name: 'Priya Mehta', role: 'Clinic Administrator' },
    { quote: 'Prescriptions and document uploads finally feel connected to treatment planning.', name: 'Dr. Mateo Ruiz', role: 'Endodontist' }
  ];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveReview((current) => (current + 1) % reviews.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [reviews.length]);

  const scrollToSection = (event, href) => {
    event.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  const changeReview = (direction) => {
    setActiveReview((current) => (current + direction + reviews.length) % reviews.length);
  };

  return (
    <div className="home-container">
      <nav className="home-nav" id="home">
        <div className="logo-brand">
          <div className="logo-icon-wrapper">
            <Stethoscope size={24} />
          </div>
          <span className="logo-text">{clinicName}</span>
        </div>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className={`home-nav-links ${menuOpen ? 'is-open' : ''}`}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={(event) => scrollToSection(event, link.href)}>
              {link.label}
            </a>
          ))}
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
            <div className="dental-photo-card" aria-label="Modern dental clinic room">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=85"
                alt="Modern dental clinic room with dental chair and equipment"
              />
            </div>
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
            {workflowSteps.map((step, index) => (
              <article key={step.title} style={{ '--step-index': index }}>
                <strong>{index + 1}</strong>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
                {index < workflowSteps.length - 1 && <ArrowRight className="workflow-arrow" size={24} />}
              </article>
            ))}
          </div>
        </section>

        <section className="homepage-section product-walkthrough" id="pricing">
          <div className="homepage-section-heading">
            <span className="section-kicker">Interactive Product Walkthrough</span>
            <h2>The software itself is the hero</h2>
            <p>Doctors can scan the patient timeline, update treatment plans, prepare prescription instructions, and review secure uploads from one workspace.</p>
          </div>
          <div className="walkthrough-grid">
            <article><span><CalendarCheck size={22} /></span><h3>Patient Timeline</h3><p>Chronological visits, procedures, prescriptions, and document activity.</p></article>
            <article><span><Pill size={22} /></span><h3>Prescription Queue</h3><p>Track status and prepare medication instructions without switching tools.</p></article>
            <article><span><UploadCloud size={22} /></span><h3>Secure Upload Vault</h3><p>Link encrypted X-rays, lab reports, and forms to patient records.</p></article>
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

        <section className="homepage-section testimonials-section" id="reviews">
          <div className="homepage-section-heading">
            <span className="section-kicker">Patient Reviews</span>
            <h2>Trusted by busy dental teams</h2>
          </div>
          <div className="testimonial-carousel" aria-live="polite">
            <button type="button" className="carousel-control" aria-label="Previous review" onClick={() => changeReview(-1)}>
              <ChevronLeft size={20} />
            </button>
            <div className="testimonial-track" style={{ transform: `translateX(-${activeReview * 100}%)` }}>
              {reviews.map((review) => (
                <article className="testimonial-slide" key={review.name}>
                  <p>"{review.quote}"</p>
                  <strong>{review.name}</strong>
                  <span>{review.role}</span>
                </article>
              ))}
            </div>
            <button type="button" className="carousel-control" aria-label="Next review" onClick={() => changeReview(1)}>
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="carousel-dots" aria-label="Review carousel position">
            {reviews.map((review, index) => (
              <button
                type="button"
                key={review.name}
                className={index === activeReview ? 'active' : ''}
                aria-label={`Show review ${index + 1}`}
                onClick={() => setActiveReview(index)}
              />
            ))}
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
              Family dental care in Parsa Bazar, Patna with a calm, organized clinical workflow for every visit.
            </p>
          </div>

          <div className="footer-contact">
            <h2>Visit {clinicName}</h2>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${clinicName.toUpperCase()}, ${address}`)}`} target="_blank" rel="noreferrer">
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

          <div className="footer-link-groups">
            <nav aria-label="Footer navigation">
              <h3>Navigation</h3>
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} onClick={(event) => scrollToSection(event, link.href)}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <span>Copyright 2026 {clinicName}. All rights reserved.</span>
          <span>Developed by NS Apps Innovation.</span>
        </div>
      </footer>
    </div>
  );
};

export default Home;
