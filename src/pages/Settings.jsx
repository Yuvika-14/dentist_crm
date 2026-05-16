import React, { useEffect, useState } from 'react';
import { Building2, Trash2, Save } from 'lucide-react';

const Settings = ({ clinic, recordCounts, saveClinic, clearClinicRecords }) => {
  const [draft, setDraft] = useState(clinic);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setDraft(clinic);
  }, [clinic]);

  const handleSave = (event) => {
    event.preventDefault();
    saveClinic(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  };

  const handleClearRecords = () => {
    if (window.confirm('Clear all patient records, appointments, visit history, and medications? Clinic settings will stay saved.')) {
      clearClinicRecords();
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="page-subtitle">Configure clinic profile and default scheduling details.</p>
        </div>
      </div>

      <div className="settings-grid">
        <form className="card" onSubmit={handleSave}>
          <div className="section-heading">
            <div>
              <h2>Clinic Profile</h2>
              <p>These details power appointment defaults and clinic identity.</p>
            </div>
            <Building2 size={24} color="var(--primary)" />
          </div>

          <div className="form-grid">
            <div className="input-group">
              <label className="input-label">Clinic Name</label>
              <input className="input-field" value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} />
            </div>
            <div className="input-group">
              <label className="input-label">Phone</label>
              <input className="input-field" value={draft.phone} onChange={(event) => setDraft({ ...draft, phone: event.target.value })} />
            </div>
            <div className="input-group">
              <label className="input-label">Email</label>
              <input className="input-field" value={draft.email} onChange={(event) => setDraft({ ...draft, email: event.target.value })} />
            </div>
            <div className="input-group">
              <label className="input-label">Default Dentist</label>
              <input className="input-field" value={draft.defaultDentist} onChange={(event) => setDraft({ ...draft, defaultDentist: event.target.value })} />
            </div>
            <div className="input-group">
              <label className="input-label">Opening Time</label>
              <input type="time" className="input-field" value={draft.openTime} onChange={(event) => setDraft({ ...draft, openTime: event.target.value })} />
            </div>
            <div className="input-group">
              <label className="input-label">Closing Time</label>
              <input type="time" className="input-field" value={draft.closeTime} onChange={(event) => setDraft({ ...draft, closeTime: event.target.value })} />
            </div>
            <div className="input-group span-2">
              <label className="input-label">Address</label>
              <input className="input-field" value={draft.address} onChange={(event) => setDraft({ ...draft, address: event.target.value })} />
            </div>
          </div>

          <div className="modal-actions">
            {saved && <span className="badge badge-success">Saved</span>}
            <button className="btn btn-primary" type="submit"><Save size={16} /> Save Settings</button>
          </div>
        </form>

        <div className="card">
          <div className="section-heading">
            <div>
              <h2>Clinic Records</h2>
              <p>Your database grows dynamically as you add patients, visits, medications, and appointments.</p>
            </div>
          </div>
          <div className="settings-counts">
            <div><strong>{recordCounts.patients}</strong><span>Patients</span></div>
            <div><strong>{recordCounts.appointments}</strong><span>Appointments</span></div>
            <div><strong>{recordCounts.history}</strong><span>Visit records</span></div>
            <div><strong>{recordCounts.medications}</strong><span>Medications</span></div>
          </div>
          <button className="btn btn-danger" type="button" onClick={handleClearRecords}>
            <Trash2 size={16} /> Clear All Records
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
