import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkflowSection from "../components/WorkflowSection";
import {
  ArrowRight,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  DatabaseBackup,
  FileCheck2,
  FileText,
  Instagram,
  Linkedin,
  Menu,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  Pill,
  ShieldCheck,
  Sparkles,
  Star,
  Stethoscope,
  UploadCloud,
  X,
  Youtube
} from 'lucide-react';

// Shared container style is now managed globally via the .section-container CSS class

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
  const address = clinic.address || '...';

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Walkthrough', href: '#walkthrough' },
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
      icon: <FileCheck2 size={24} />,
      title: 'Visual Treatment Planning',
      text: 'Map fillings, root canals, extractions, and follow-up procedures on a clear care timeline.'
    },
    {
      icon: <UploadCloud size={24} />,
      title: 'Secure Document Uploads',
      text: 'Store X-rays, lab reports, intake forms, and consent PDFs in an encrypted cloud vault.'
    }
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
    // Handle WorkflowSection's id="workflow" directly
    const id = href.replace('#', '');
    const target = document.getElementById(id) || document.querySelector(href);
    if (target) {
      const offset = 104;
      const targetTop = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: Math.max(targetTop, 0), behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  const changeReview = (direction) => {
    setActiveReview((current) => (current + direction + reviews.length) % reviews.length);
  };

  return (
    <div className="home-container">
      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
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
        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="home-hero">
          <div className="hero-copy animate-fade-in">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 22 }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 11, fontWeight: 700, letterSpacing: "0.13em",
                textTransform: "uppercase", color: "#2D7A6B",
                fontFamily: "'DM Mono', monospace",
                background: "#E8F5F2", padding: "4px 12px",
                borderRadius: 100, border: "1px solid rgba(45,122,107,0.2)",
              }}>
                <Sparkles size={12} color="#2D7A6B" />
                Modern Clinical Workspace
              </span>
            </div>
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
            {/* Social Proof */}
           
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

        {/* ── FEATURES ──────────────────────────────────────────────────────── */}
        
        <section className="homepage-section" id="features" style={{ padding: '40px 0' }}>
          {/* Inner container — same token as WorkflowSection */}
          <div className="section-container">
            <div style={{ marginBottom: 56 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.13em",
                  textTransform: "uppercase", color: "#2D7A6B",
                  fontFamily: "'DM Mono', 'Fira Mono', monospace",
                  background: "#E8F5F2",
                  padding: "4px 10px", borderRadius: 100,
                  border: "1px solid rgba(45,122,107,0.2)",
                }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: "#2D7A6B", display: "inline-block",
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }} />
                  Features and Capabilities
                </span>
              </div>
              <h2 style={{
                fontSize: "clamp(28px, 3.6vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 1.1,
                color: "#0D1B2A",
                margin: "0 0 14px",
                fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
                maxWidth: 620,
              }}>
                Everything the clinic team needs to <span style={{ color: "#2D7A6B" }}>manage care</span>
              </h2>
              <p style={{
                fontSize: 16, lineHeight: 1.7,
                color: "#64748B",
                margin: 0, maxWidth: 480,
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}>
                Built around records, prescriptions, treatment planning, and secure documents.
              </p>
            </div>
            <div className="feature-capability-grid" style={{ padding: 0 }}>
              {featureCards.map((feature) => (
                <article key={feature.title}>
                  <span>{feature.icon}</span>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── WORKFLOW + WALKTHROUGH (WorkflowSection manages its own container) */}
        <WorkflowSection />

        {/* ── SECURITY ──────────────────────────────────────────────────────── */}
        <section className="security-compliance-banner" id="security">
          <div style={{ marginBottom: 0 }}>
            <span className="section-kicker">Security & Compliance</span>
            <h2 style={{ color: 'white', margin: '10px 0 0' }}>Designed for sensitive medical data</h2>
          </div>
          <div className="security-badges">
            <span><ShieldCheck size={16} /> HIPAA Compliance</span>
            <span><LockKeyhole size={16} /> End-to-end encryption</span>
            <span><DatabaseBackup size={16} /> Secure cloud backups</span>
            <span><FileCheck2 size={16} /> Activity audit trail</span>
          </div>
        </section>

        {/* ── REVIEWS ───────────────────────────────────────────────────────── */}
        <section className="homepage-section testimonials-section" id="reviews" style={{ padding: '40px 0' }}>
          <div className="section-container">
            <div style={{ marginBottom: 56, textAlign: 'left' }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.13em",
                  textTransform: "uppercase", color: "#2D7A6B",
                  fontFamily: "'DM Mono', 'Fira Mono', monospace",
                  background: "#E8F5F2",
                  padding: "4px 10px", borderRadius: 100,
                  border: "1px solid rgba(45,122,107,0.2)",
                }}>
                  <span style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: "#2D7A6B", display: "inline-block",
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }} />
                  Patient Reviews
                </span>
              </div>
              <h2 style={{
                fontSize: "clamp(28px, 3.6vw, 48px)",
                fontWeight: 800,
                letterSpacing: "-0.035em",
                lineHeight: 1.1,
                color: "#0D1B2A",
                margin: "0 0 14px",
                fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
                maxWidth: 620,
              }}>
                Trusted by <span style={{ color: "#2D7A6B" }}>busy dental teams</span>
              </h2>
              <p style={{
                fontSize: 16, lineHeight: 1.7,
                color: "#64748B",
                margin: 0, maxWidth: 480,
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}>
                See how clinical teams run a calm, efficient practice using our unified CRM.
              </p>
            </div>
            <div className="testimonial-carousel" aria-live="polite" style={{ padding: 0 }}>
              <button type="button" className="carousel-control" aria-label="Previous review" onClick={() => changeReview(-1)}>
                <ChevronLeft size={20} />
              </button>
              <div className="testimonial-viewport">
                <div className="testimonial-track" style={{ transform: `translateX(-${activeReview * 100}%)` }}>
                  {reviews.map((review) => (
                    <article className="testimonial-slide" key={review.name}>
                      <div className="testimonial-stars" aria-label="Five star review">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star key={starIndex} size={18} fill="currentColor" />
                        ))}
                      </div>
                      <p>"{review.quote}"</p>
                      <strong>{review.name}</strong>
                      <span>{review.role}</span>
                    </article>
                  ))}
                </div>
              </div>
              <button type="button" className="carousel-control" aria-label="Next review" onClick={() => changeReview(1)}>
                <ChevronRight size={20} />
              </button>
            </div>
            <div className="carousel-dots" style={{ padding: 0 }} aria-label="Review carousel position">
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
          </div>
        </section>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────────────────────── */}
      <footer className="home-footer" id="contact">
        <div className="footer-content section-container">
          <div className="footer-brand">
            <div className="logo-brand">
              <div className="logo-icon-wrapper">
                <Stethoscope size={22} />
              </div>
              <span className="logo-text">{clinicName}</span>
            </div>
            <p>Family dental care in Parsa Bazar, Patna with a calm, organized clinical workflow for every visit.</p>
            <div className="footer-socials" aria-label="Social links">
              <a href="#home" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="#home" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#home" aria-label="YouTube"><Youtube size={18} /></a>
            </div>
          </div>

          <div className="footer-contact">
            <h2>Visit {clinicName}</h2>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${clinicName.toUpperCase()}, ${address}`)}`} target="_blank" rel="noreferrer">
              <MapPin size={18} /><span>{address}</span>
            </a>
            <a href={`tel:${phone.replace(/[^\d+]/g, '')}`}>
              <Phone size={18} /><span>{phone}</span>
            </a>
            <a href={`mailto:${email}`}>
              <Mail size={18} /><span>{email}</span>
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
