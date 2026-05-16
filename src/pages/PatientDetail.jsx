import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Pill, AlertCircle, Plus, Calendar, Edit3, Save, X, Phone, Mail, MapPin, Trash2 } from 'lucide-react';

const today = new Date().toISOString().split('T')[0];

const tabItems = [
  { id: 'history', label: 'Medical History', icon: FileText },
  { id: 'medications', label: 'Medications', icon: Pill },
  { id: 'appointments', label: 'Appointments', icon: Calendar }
];

const PatientDetail = ({
  patients,
  history,
  medications,
  appointments,
  addVisit,
  addMedication,
  updateMedicationStatus,
  updatePatient,
  deletePatient
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const patient = patients.find((item) => item.id === Number(id));

  const [activeTab, setActiveTab] = useState('history');
  const [showAddLogModal, setShowAddLogModal] = useState(false);
  const [showAddMedicationModal, setShowAddMedicationModal] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileDraft, setProfileDraft] = useState(patient || {});
  const [newLog, setNewLog] = useState({ date: today, type: 'Procedure', tooth: '', diagnosis: '', notes: '', nextStep: '' });
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    startDate: today,
    endDate: '',
    status: 'Active',
    instructions: ''
  });

  if (!patient) {
    return (
      <div className="page-container">
        <button className="btn btn-secondary" onClick={() => navigate('/patients')}>Back to Patients</button>
        <div className="empty-state"><p>Patient not found.</p></div>
      </div>
    );
  }

  const patientHistory = history[patient.id] || [];
  const patientMedications = medications[patient.id] || [];
  const patientAppointments = appointments
    .filter((appointment) => Number(appointment.patientId) === patient.id)
    .sort((a, b) => `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`));

  const handleAddLog = (event) => {
    event.preventDefault();
    addVisit(patient.id, newLog);
    setShowAddLogModal(false);
    setNewLog({ date: today, type: 'Procedure', tooth: '', diagnosis: '', notes: '', nextStep: '' });
  };

  const handleAddMedication = (event) => {
    event.preventDefault();
    addMedication(patient.id, newMedication);
    setShowAddMedicationModal(false);
    setNewMedication({ name: '', dosage: '', frequency: '', startDate: today, endDate: '', status: 'Active', instructions: '' });
  };

  const handleProfileSave = () => {
    updatePatient(patient.id, profileDraft);
    setEditingProfile(false);
  };

  const startEditing = () => {
    setProfileDraft(patient);
    setEditingProfile(true);
  };

  const handleDeletePatient = () => {
    if (window.confirm(`Delete ${patient.name}'s patient record and linked appointments?`)) {
      deletePatient(patient.id);
      navigate('/patients');
    }
  };

  return (
    <div className="page-container animate-fade-in">
      <button className="btn btn-secondary ghost-btn" onClick={() => navigate('/patients')}>
        <ArrowLeft size={16} /> Back to Patients
      </button>

      <div className="patient-header">
        <div className="patient-avatar">{patient.name.charAt(0)}</div>
        <div className="patient-summary">
          <div className="flex-row gap-4 wrap">
            <h1>{patient.name}</h1>
            <span className="badge badge-warning">{patient.condition}</span>
          </div>
          <div className="patient-meta">
            <span>{patient.age} yrs, {patient.gender}</span>
            <span>ID #{patient.id.toString().padStart(4, '0')}</span>
            <span>Last visit: {patient.lastVisit}</span>
            <span>Next visit: {patient.nextVisit || 'Not scheduled'}</span>
          </div>
        </div>
        <div className="patient-actions">
          <button className="btn btn-secondary" onClick={startEditing}><Edit3 size={16} /> Edit Profile</button>
          <button className="btn btn-danger" onClick={handleDeletePatient}><Trash2 size={16} /> Delete Patient</button>
          <button className="btn btn-primary" onClick={() => setShowAddLogModal(true)}><Plus size={16} /> Log Visit</button>
        </div>
      </div>

      <div className="patient-layout">
        <aside className="patient-sidebar">
          <div className="card compact-card">
            <h3>Contact</h3>
            <div className="detail-stack">
              <span><Phone size={15} /> {patient.phone}</span>
              <span><Mail size={15} /> {patient.email || 'No email'}</span>
              <span><MapPin size={15} /> {patient.address || 'No address'}</span>
            </div>
          </div>

          <div className="card compact-card">
            <h3>Clinical Alerts</h3>
            <div className="alert-box">
              <AlertCircle size={16} />
              <span>{patient.allergies || 'No allergies recorded'}</span>
            </div>
            <dl className="profile-facts">
              <div><dt>Blood group</dt><dd>{patient.bloodGroup || 'Not recorded'}</dd></div>
              <div><dt>Emergency</dt><dd>{patient.emergencyContact || 'Not recorded'}</dd></div>
            </dl>
          </div>

          <div className="card compact-card">
            <h3>Notes</h3>
            <p className="muted note-text">{patient.notes || 'No clinical notes yet.'}</p>
          </div>
        </aside>

        <main className="patient-main">
          <div className="tab-bar">
            {tabItems.map((tab) => {
              const Icon = tab.icon;
              return (
                <button key={tab.id} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} onClick={() => setActiveTab(tab.id)}>
                  <Icon size={18} /> {tab.label}
                </button>
              );
            })}
          </div>

          {activeTab === 'history' && (
            <section className="card">
              <div className="section-heading">
                <div>
                  <h2>Visit History</h2>
                  <p>Diagnosis, tooth area, treatment notes, and next steps.</p>
                </div>
                <button className="btn btn-primary compact-btn" onClick={() => setShowAddLogModal(true)}><Plus size={14} /> Add</button>
              </div>

              {patientHistory.length === 0 ? (
                <div className="empty-state"><FileText size={32} /><p>No visit history found.</p></div>
              ) : (
                <div className="timeline">
                  {patientHistory.map((entry) => (
                    <article key={entry.id} className="timeline-item">
                      <div className="timeline-dot" />
                      <div className="timeline-content">
                        <div className="flex-row justify-between wrap">
                          <div className="flex-row gap-2 wrap">
                            <strong>{entry.date}</strong>
                            <span className="badge badge-primary">{entry.type}</span>
                            {entry.tooth && <span className="badge badge-warning">{entry.tooth}</span>}
                          </div>
                        </div>
                        <h3>{entry.diagnosis || 'Clinical visit'}</h3>
                        <p>{entry.notes}</p>
                        {entry.nextStep && <span className="next-step">Next: {entry.nextStep}</span>}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeTab === 'medications' && (
            <section className="card">
              <div className="section-heading">
                <div>
                  <h2>Medications</h2>
                  <p>Track prescriptions, dosage, dates, and current status.</p>
                </div>
                <button className="btn btn-primary compact-btn" onClick={() => setShowAddMedicationModal(true)}><Plus size={14} /> Add</button>
              </div>

              {patientMedications.length === 0 ? (
                <div className="empty-state"><Pill size={32} /><p>No prescriptions recorded.</p></div>
              ) : (
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Medication</th>
                        <th>Dosage</th>
                        <th>Dates</th>
                        <th>Status</th>
                        <th>Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patientMedications.map((medication) => (
                        <tr key={medication.id}>
                          <td>
                            <strong>{medication.name}</strong>
                            <span className="table-note">{medication.instructions}</span>
                          </td>
                          <td>{medication.dosage}<span className="table-note">{medication.frequency}</span></td>
                          <td>{medication.startDate || 'N/A'} to {medication.endDate || 'Ongoing'}</td>
                          <td><span className={`badge ${medication.status === 'Active' ? 'badge-success' : 'badge-primary'}`}>{medication.status}</span></td>
                          <td>
                            <select className="input-field compact-select" value={medication.status} onChange={(event) => updateMedicationStatus(patient.id, medication.id, event.target.value)}>
                              <option>Active</option>
                              <option>Completed</option>
                              <option>Paused</option>
                              <option>Stopped</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {activeTab === 'appointments' && (
            <section className="card">
              <div className="section-heading">
                <div>
                  <h2>Appointments</h2>
                  <p>Scheduled, completed, and cancelled visits for this patient.</p>
                </div>
                <button className="btn btn-secondary compact-btn" onClick={() => navigate('/appointments')}>Schedule</button>
              </div>

              {patientAppointments.length === 0 ? (
                <div className="empty-state"><Calendar size={32} /><p>No appointments scheduled.</p></div>
              ) : (
                <ul className="record-list">
                  {patientAppointments.map((appointment) => (
                    <li key={appointment.id}>
                      <div>
                        <strong>{appointment.date} at {appointment.time}</strong>
                        <span>{appointment.procedure} with {appointment.dentist}</span>
                      </div>
                      <span className="badge badge-primary">{appointment.status}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          )}
        </main>
      </div>

      {editingProfile && (
        <div className="modal-backdrop">
          <div className="card modal-card large-modal animate-fade-in">
            <div className="modal-header">
              <div>
                <h2>Edit Patient Profile</h2>
                <p>Update demographics, alerts, and care notes.</p>
              </div>
              <button className="icon-btn" onClick={() => setEditingProfile(false)} aria-label="Close edit patient form"><X size={18} /></button>
            </div>
            <div className="form-grid">
              {['name', 'age', 'gender', 'phone', 'email', 'bloodGroup', 'condition', 'nextVisit', 'address', 'allergies', 'emergencyContact'].map((field) => (
                <div className={`input-group ${field === 'address' ? 'span-2' : ''}`} key={field}>
                  <label className="input-label">{field.replace(/([A-Z])/g, ' $1')}</label>
                  <input
                    className="input-field"
                    type={field === 'age' ? 'number' : field === 'nextVisit' ? 'date' : 'text'}
                    value={profileDraft[field] || ''}
                    onChange={(event) => setProfileDraft({ ...profileDraft, [field]: event.target.value })}
                  />
                </div>
              ))}
              <div className="input-group span-2">
                <label className="input-label">Notes</label>
                <textarea className="input-field text-area" value={profileDraft.notes || ''} onChange={(event) => setProfileDraft({ ...profileDraft, notes: event.target.value })} />
              </div>
              <div className="modal-actions span-2">
                <button className="btn btn-secondary" onClick={() => setEditingProfile(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleProfileSave}><Save size={16} /> Save Changes</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAddLogModal && (
        <div className="modal-backdrop">
          <div className="card modal-card animate-fade-in">
            <div className="modal-header">
              <div>
                <h2>Log New Visit</h2>
                <p>Add this visit to the patient's medical history.</p>
              </div>
              <button className="icon-btn" onClick={() => setShowAddLogModal(false)} aria-label="Close visit form"><X size={18} /></button>
            </div>
            <form onSubmit={handleAddLog} className="flex-col gap-4">
              <div className="input-group"><label className="input-label">Date</label><input required type="date" className="input-field" value={newLog.date} onChange={(event) => setNewLog({ ...newLog, date: event.target.value })} /></div>
              <div className="input-group"><label className="input-label">Visit Type</label><select className="input-field" value={newLog.type} onChange={(event) => setNewLog({ ...newLog, type: event.target.value })}><option>Procedure</option><option>Checkup</option><option>Consultation</option><option>Emergency</option><option>Follow-up</option></select></div>
              <div className="input-group"><label className="input-label">Tooth / Area</label><input className="input-field" placeholder="Example: UR6, LL1, General" value={newLog.tooth} onChange={(event) => setNewLog({ ...newLog, tooth: event.target.value })} /></div>
              <div className="input-group"><label className="input-label">Diagnosis</label><input required className="input-field" value={newLog.diagnosis} onChange={(event) => setNewLog({ ...newLog, diagnosis: event.target.value })} /></div>
              <div className="input-group"><label className="input-label">Treatment Notes</label><textarea required className="input-field text-area" value={newLog.notes} onChange={(event) => setNewLog({ ...newLog, notes: event.target.value })} /></div>
              <div className="input-group"><label className="input-label">Next Step</label><input className="input-field" value={newLog.nextStep} onChange={(event) => setNewLog({ ...newLog, nextStep: event.target.value })} /></div>
              <div className="modal-actions"><button type="button" className="btn btn-secondary" onClick={() => setShowAddLogModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">Save Visit</button></div>
            </form>
          </div>
        </div>
      )}

      {showAddMedicationModal && (
        <div className="modal-backdrop">
          <div className="card modal-card animate-fade-in">
            <div className="modal-header">
              <div>
                <h2>Add Medication</h2>
                <p>Record prescription details and usage instructions.</p>
              </div>
              <button className="icon-btn" onClick={() => setShowAddMedicationModal(false)} aria-label="Close medication form"><X size={18} /></button>
            </div>
            <form onSubmit={handleAddMedication} className="flex-col gap-4">
              <div className="input-group"><label className="input-label">Medication Name</label><input required className="input-field" value={newMedication.name} onChange={(event) => setNewMedication({ ...newMedication, name: event.target.value })} /></div>
              <div className="input-group"><label className="input-label">Dosage</label><input required className="input-field" value={newMedication.dosage} onChange={(event) => setNewMedication({ ...newMedication, dosage: event.target.value })} /></div>
              <div className="input-group"><label className="input-label">Frequency</label><input className="input-field" value={newMedication.frequency} onChange={(event) => setNewMedication({ ...newMedication, frequency: event.target.value })} /></div>
              <div className="form-grid two-col">
                <div className="input-group"><label className="input-label">Start Date</label><input type="date" className="input-field" value={newMedication.startDate} onChange={(event) => setNewMedication({ ...newMedication, startDate: event.target.value })} /></div>
                <div className="input-group"><label className="input-label">End Date</label><input type="date" className="input-field" value={newMedication.endDate} onChange={(event) => setNewMedication({ ...newMedication, endDate: event.target.value })} /></div>
              </div>
              <div className="input-group"><label className="input-label">Instructions</label><textarea className="input-field text-area" value={newMedication.instructions} onChange={(event) => setNewMedication({ ...newMedication, instructions: event.target.value })} /></div>
              <div className="modal-actions"><button type="button" className="btn btn-secondary" onClick={() => setShowAddMedicationModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">Save Medication</button></div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetail;
