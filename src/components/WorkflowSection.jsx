import { useState, useEffect, useRef } from "react";
import { CalendarCheck, Pill, UploadCloud } from "lucide-react";

const workflowSteps = [
  {
    id: "intake",
    number: "01",
    title: "Patient Intake",
    text: "Capture demographic data, insurance details, and chief complaints through a structured intake form — all indexed to the patient record instantly.",
  },
  {
    id: "review",
    number: "02",
    title: "Clinical Review",
    text: "Physicians access the full timeline, prior labs, and scanned documents from one workspace — no tab-switching, no lost context.",
  },
  {
    id: "prescribe",
    number: "03",
    title: "Prescribe & Document",
    text: "Issue prescriptions, attach clinical notes, and auto-generate patient instructions. Every action is time-stamped and audit-ready.",
  },
  {
    id: "followup",
    number: "04",
    title: "Follow-Up & Sync",
    text: "Schedule follow-ups, trigger automated reminders, and push summaries to the patient portal — closing every care loop automatically.",
  },
];

const walkthroughFeatures = [
  {
    icon: CalendarCheck,
    title: "Patient Timeline",
    desc: "Chronological visits, procedures, prescriptions, and document activity.",
    tag: "Timeline updated",
  },
  {
    icon: Pill,
    title: "Prescription Queue",
    desc: "Track status and prepare medication instructions without switching tools.",
    tag: "Prescription queued",
  },
  {
    icon: UploadCloud,
    title: "Secure Upload Vault",
    desc: "Link encrypted X-rays, lab reports, and forms to patient records.",
    tag: "Documents secured",
  },
];

// ─── Workflow Section ─────────────────────────────────────────────────────────

function WorkflowSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const walkthroughRef = useRef(null);
  const progressRef = useRef(null);

  // Expose refs globally so navbar can scroll to them
  useEffect(() => {
    window.__workflowRef = sectionRef;
    window.__walkthroughRef = walkthroughRef;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let prog = 0;
    let step = 0;
    const STEP_DURATION = 2400;
    const TICK = 16;

    progressRef.current = setInterval(() => {
      prog += (TICK / STEP_DURATION) * 100;
      if (prog >= 100) {
        prog = 0;
        step = (step + 1) % workflowSteps.length;
        setActiveStep(step);
      }
      setProgress(prog);
    }, TICK);

    return () => clearInterval(progressRef.current);
  }, [isVisible]);

  const globalProgress =
    ((activeStep + progress / 100) / workflowSteps.length) * 100;

  return (
    <>
      {/* ── WORKFLOW SECTION ─────────────────────────── */}
      <section
        id="workflow"
        ref={sectionRef}
        style={{
          background: "transparent",
          padding: "60px 0 60px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="section-container" style={{ position: "relative" }}>

          {/* Section header */}
          <div style={{
            marginBottom: 72,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}>
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
                How It Works
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
              A clinical workflow{" "}
              <span style={{ color: "#2D7A6B" }}>that thinks ahead</span>
            </h2>
            <p style={{
              fontSize: 16, lineHeight: 1.7,
              color: "#64748B",
              margin: 0, maxWidth: 460,
              fontFamily: "'DM Sans', system-ui, sans-serif",
            }}>
              From intake to follow-up, every step connects — so care teams spend time on patients, not process.
            </p>
          </div>

          {/* Workflow timeline */}
          <div style={{ position: "relative" }}>
            {/* Rail */}
            <div style={{
              position: "absolute",
              top: 36,
              left: "calc(12.5% + 4px)",
              right: "calc(12.5% + 4px)",
              height: 2,
              background: "#E2E8F0",
              borderRadius: 2,
              zIndex: 0,
            }}>
              <div style={{
                position: "absolute", top: 0, left: 0, height: "100%",
                width: `${globalProgress}%`,
                background: "linear-gradient(90deg, #2D7A6B, #48BB99)",
                borderRadius: 2,
                transition: "width 16ms linear",
                boxShadow: "0 0 8px rgba(45,122,107,0.4)",
              }} />
              <div style={{
                position: "absolute", top: "50%",
                left: `${globalProgress}%`,
                transform: "translate(-50%, -50%)",
                width: 10, height: 10,
                borderRadius: "50%",
                background: "#2D7A6B",
                boxShadow: "0 0 0 4px rgba(45,122,107,0.15), 0 0 14px rgba(45,122,107,0.5)",
                transition: "left 16ms linear",
              }} />
            </div>

            {/* Steps — equal height cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20,
              position: "relative",
              zIndex: 1,
              alignItems: "start",
            }}>
              {workflowSteps.map((step, index) => {
                const isActive = activeStep === index;
                const isPast = index < activeStep;

                return (
                  <div
                    key={step.id}
                    onClick={() => {
                      clearInterval(progressRef.current);
                      setActiveStep(index);
                      setProgress(0);
                    }}
                    style={{
                      cursor: "pointer",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateY(0)" : "translateY(20px)",
                      transition: `opacity 0.55s ease ${index * 0.1 + 0.15}s, transform 0.55s ease ${index * 0.1 + 0.15}s`,
                    }}
                  >
                    {/* Node */}
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      margin: "0 auto 28px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: isActive ? "#2D7A6B" : isPast ? "#2D7A6B" : "#F1F5F9",
                      border: `2px solid ${isActive || isPast ? "#2D7A6B" : "#E2E8F0"}`,
                      boxShadow: isActive
                        ? "0 0 0 6px rgba(45,122,107,0.12), 0 0 20px rgba(45,122,107,0.25)"
                        : "none",
                      transition: "all 0.45s cubic-bezier(0.4,0,0.2,1)",
                      position: "relative",
                    }}>
                      <span style={{
                        fontSize: 12, fontWeight: 700,
                        fontFamily: "'DM Mono', monospace",
                        color: isActive || isPast ? "#FFFFFF" : "#94A3B8",
                        transition: "color 0.35s ease",
                      }}>
                        {step.number}
                      </span>
                      {isActive && (
                        <span style={{
                          position: "absolute",
                          inset: -9,
                          borderRadius: "50%",
                          border: "1.5px solid #2D7A6B",
                          opacity: 0,
                          animation: "ring-pulse 1.8s ease-out infinite",
                        }} />
                      )}
                    </div>

                    {/* Card — fixed min-height so all cards stay equal */}
                    <div style={{
                      padding: "24px 20px 28px",
                      borderRadius: 14,
                      border: `1.5px solid ${isActive ? "rgba(45,122,107,0.35)" : "#E8EEF4"}`,
                      background: isActive ? "#F0FAF8" : "#FFFFFF",
                      boxShadow: isActive
                        ? "0 4px 24px rgba(45,122,107,0.10), 0 1px 4px rgba(0,0,0,0.04)"
                        : "0 1px 4px rgba(0,0,0,0.04)",
                      transition: "border-color 0.45s cubic-bezier(0.4,0,0.2,1), background 0.45s cubic-bezier(0.4,0,0.2,1), box-shadow 0.45s cubic-bezier(0.4,0,0.2,1)",
                      /* Equal height — no layout shift */
                      minHeight: 160,
                      display: "flex",
                      flexDirection: "column",
                    }}>
                      {/* Progress bar — reserve space always so card height doesn't change */}
                      <div style={{
                        height: 2,
                        background: "#E2E8F0",
                        borderRadius: 2,
                        marginBottom: 16,
                        overflow: "hidden",
                        opacity: isActive ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      }}>
                        <div style={{
                          height: "100%",
                          width: isActive ? `${progress}%` : "0%",
                          background: "#2D7A6B",
                          borderRadius: 2,
                          transition: isActive ? "width 16ms linear" : "none",
                        }} />
                      </div>

                      <h3 style={{
                        fontSize: 14.5, fontWeight: 700,
                        letterSpacing: "-0.02em",
                        color: isActive ? "#0D1B2A" : "#334155",
                        marginBottom: 9,
                        fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
                        transition: "color 0.35s ease",
                        margin: "0 0 9px",
                      }}>
                        {step.title}
                      </h3>
                      <p style={{
                        fontSize: 13, lineHeight: 1.65,
                        color: isActive ? "#475569" : "#94A3B8",
                        margin: 0,
                        fontFamily: "'DM Sans', system-ui, sans-serif",
                        transition: "color 0.35s ease",
                        flex: 1,
                      }}>
                        {step.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Keyframes */}
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500;600&display=swap');
          @keyframes pulse-dot {
            0%,100%{opacity:1;transform:scale(1)}
            50%{opacity:.5;transform:scale(.8)}
          }
          @keyframes ring-pulse {
            0%{opacity:.6;transform:scale(.85)}
            100%{opacity:0;transform:scale(1.55)}
          }
          @keyframes row-in {
            from{opacity:0;transform:translateX(-6px)}
            to{opacity:1;transform:translateX(0)}
          }
        `}</style>
      </section>

      {/* ── WALKTHROUGH SECTION — fully separate ─────── */}
      <section
        id="walkthrough"
        ref={walkthroughRef}
        style={{
          background: "transparent",
          padding: "60px 0 60px",
        }}
      >
        <div className="section-container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 72,
            alignItems: "center",
          }}>
            {/* Left */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 11, fontWeight: 700, letterSpacing: "0.13em",
                  textTransform: "uppercase", color: "#2D7A6B",
                  fontFamily: "'DM Mono', monospace",
                  background: "#E8F5F2", padding: "4px 10px",
                  borderRadius: 100, border: "1px solid rgba(45,122,107,0.2)",
                }}>
                  <span style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: "#2D7A6B",
                    display: "inline-block",
                    animation: "pulse-dot 2s ease-in-out infinite",
                  }} />
                  Interactive Product Walkthrough
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
              }}>
                The software{" "}
                <span style={{ color: "#2D7A6B" }}>is the hero</span>
              </h2>
              <p style={{
                fontSize: 16,
                lineHeight: 1.7,
                color: "#64748B",
                margin: "0 0 40px",
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}>
                Doctors can scan the patient timeline, update treatment plans, prepare prescription instructions, and review secure uploads from one unified workspace.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {walkthroughFeatures.map((feat) => {
                  const Icon = feat.icon;
                  return (
                    <div
                      key={feat.title}
                      style={{
                        display: "flex", alignItems: "flex-start", gap: 14,
                        padding: "14px 18px",
                        borderRadius: 12,
                        border: "1.5px solid #E8EEF4",
                        background: "#FAFBFC",
                        transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
                        cursor: "default",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.borderColor = "rgba(45,122,107,0.3)";
                        e.currentTarget.style.background = "#F0FAF8";
                        e.currentTarget.style.boxShadow = "0 2px 12px rgba(45,122,107,0.08)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderColor = "#E8EEF4";
                        e.currentTarget.style.background = "#FAFBFC";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <div style={{
                        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                        background: "#E8F5F2",
                        border: "1.5px solid rgba(45,122,107,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <Icon size={17} color="#2D7A6B" />
                      </div>
                      <div>
                        <div style={{
                          fontSize: 14, fontWeight: 700, color: "#0D1B2A",
                          marginBottom: 4,
                          fontFamily: "'Sora', sans-serif",
                          letterSpacing: "-0.01em",
                        }}>
                          {feat.title}
                        </div>
                        <div style={{
                          fontSize: 13, lineHeight: 1.55,
                          color: "#64748B",
                          fontFamily: "'DM Sans', sans-serif",
                        }}>
                          {feat.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: workspace panel */}
            <WorkspacePanel />
          </div>
        </div>
      </section>
    </>
  );
}

// ─── Workspace Panel ──────────────────────────────────────────────────────────

function WorkspacePanel() {
  const [wsTab, setWsTab] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTick(v => v + 1), 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setWsTab(prev => (prev + 1) % 3);
  }, [tick]);

  const tabs = ["Timeline", "Prescriptions", "Vault"];

  const rows = [
    [
      { label: "Intake Assessment", date: "May 21", status: "Complete" },
      { label: "Lab Results — CBC", date: "May 19", status: "Reviewed" },
      { label: "X-Ray Upload", date: "May 17", status: "Secured" },
      { label: "Rx: Metformin", date: "May 14", status: "Queued" },
    ],
    [
      { label: "Metformin 500mg", date: "2× daily", status: "Active" },
      { label: "Lisinopril 10mg", date: "1× daily", status: "Active" },
      { label: "Aspirin 81mg", date: "As needed", status: "PRN" },
    ],
    [
      { label: "Chest_Xray_2024.dcm", date: "3.2 MB", status: "Encrypted" },
      { label: "Lab_Report_May.pdf", date: "180 KB", status: "Linked" },
      { label: "Insurance_Card.jpg", date: "95 KB", status: "Verified" },
    ],
  ];

  return (
    <div style={{
      borderRadius: 18,
      border: "1.5px solid #E2E8F0",
      background: "#FFFFFF",
      overflow: "hidden",
      boxShadow: "0 8px 40px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)",
    }}>
      {/* Titlebar */}
      <div style={{
        padding: "13px 18px",
        borderBottom: "1px solid #F1F5F9",
        background: "#FAFBFC",
        display: "flex", alignItems: "center", gap: 10,
      }}>
        <div style={{ display: "flex", gap: 5 }}>
          {["#FF5F57","#FFBD2E","#28CA41"].map(c => (
            <span key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c, opacity: .8 }} />
          ))}
        </div>
        <span style={{
          flex: 1, textAlign: "center",
          fontSize: 12, color: "#94A3B8",
          fontFamily: "'DM Mono', monospace",
          marginLeft: -22,
        }}>
          patient — workspace
        </span>
        <span style={{
          fontSize: 10, padding: "2px 7px",
          borderRadius: 100, background: "#E8F5F2",
          color: "#2D7A6B", border: "1px solid rgba(45,122,107,0.25)",
          fontFamily: "'DM Mono', monospace", fontWeight: 600,
        }}>
          LIVE
        </span>
      </div>

      {/* Patient row */}
      <div style={{
        padding: "16px 20px 14px",
        display: "flex", alignItems: "center", gap: 12,
        borderBottom: "1px solid #F1F5F9",
      }}>
        <div style={{
          width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
          background: "linear-gradient(135deg, #2D7A6B 0%, #48BB99 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, color: "#FFFFFF",
          fontFamily: "'Sora', sans-serif",
        }}>SA</div>
        <div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: "#0D1B2A", marginBottom: 2, fontFamily: "'Sora', sans-serif" }}>Sarah Ahmed</div>
          <div style={{ fontSize: 11.5, color: "#94A3B8", fontFamily: "'DM Mono', monospace" }}>ID #PA-2847 · Type II Diabetes</div>
        </div>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "#94A3B8", fontFamily: "'DM Mono', monospace", marginBottom: 2 }}>Last visit</div>
          <div style={{ fontSize: 13, color: "#0D1B2A", fontFamily: "'DM Sans', sans-serif", fontWeight: 600 }}>May 21, 2025</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", padding: "0 20px", borderBottom: "1px solid #F1F5F9" }}>
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setWsTab(i)}
            style={{
              padding: "11px 14px",
              fontSize: 13,
              fontWeight: wsTab === i ? 700 : 400,
              fontFamily: "'DM Sans', sans-serif",
              color: wsTab === i ? "#2D7A6B" : "#94A3B8",
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${wsTab === i ? "#2D7A6B" : "transparent"}`,
              cursor: "pointer",
              transition: "all 0.25s ease",
              marginBottom: -1,
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Rows */}
      <div style={{ padding: "10px 0 8px", minHeight: 142 }}>
        {rows[wsTab].map((row, i) => (
          <div
            key={row.label}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "9px 20px",
              borderRadius: 7, margin: "0 6px",
              animation: `row-in 0.28s ease ${i * 0.06}s both`,
              cursor: "default",
              transition: "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#F8FAFB"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <span style={{
              width: 7, height: 7, borderRadius: "50%",
              background: "#2D7A6B", flexShrink: 0,
              boxShadow: "0 0 5px rgba(45,122,107,0.4)",
            }} />
            <span style={{ flex: 1, fontSize: 13, color: "#334155", fontFamily: "'DM Sans', sans-serif" }}>
              {row.label}
            </span>
            <span style={{ fontSize: 11.5, color: "#94A3B8", fontFamily: "'DM Mono', monospace", flexShrink: 0 }}>
              {row.date}
            </span>
            <span style={{
              fontSize: 10.5, padding: "2px 8px", borderRadius: 100,
              background: "#E8F5F2", color: "#2D7A6B",
              border: "1px solid rgba(45,122,107,0.22)",
              fontFamily: "'DM Mono', monospace", fontWeight: 600, flexShrink: 0,
            }}>
              {row.status}
            </span>
          </div>
        ))}
      </div>

      {/* Footer status bar */}
      <div style={{
        padding: "12px 20px",
        borderTop: "1px solid #F1F5F9",
        display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
        background: "#FAFBFC",
      }}>
        {walkthroughFeatures.map((f, i) => (
          <span
            key={f.title}
            style={{
              fontSize: 11, fontFamily: "'DM Mono', monospace",
              color: wsTab === i ? "#2D7A6B" : "#CBD5E1",
              display: "flex", alignItems: "center", gap: 5,
              transition: "color 0.3s ease",
            }}
          >
            <span style={{
              width: 5, height: 5, borderRadius: "50%",
              background: wsTab === i ? "#2D7A6B" : "#E2E8F0",
              transition: "background 0.3s ease",
            }} />
            {f.tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Navbar scroll helper (add to your Navbar component) ─────────────────────
// In your Navbar, find the "Workflow" link and replace its onClick with:
//
//   onClick={() => {
//     const el = document.getElementById("workflow");
//     if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
//   }}
//
// That's all you need — the section now has id="workflow".

export default WorkflowSection;