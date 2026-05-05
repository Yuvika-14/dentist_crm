import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, Pill, AlertCircle, Plus } from 'lucide-react';

const PatientDetail = ({ patients, history, medications, addVisit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('history');
  
  const patient = patients.find(p => p.id === parseInt(id, 10));
  const patientHistory = history[patient?.id] || [];
  const patientMedications = medications[patient?.id] || [];

  const [showAddLogModal, setShowAddLogModal] = useState(false);
  const [newLog, setNewLog] = useState({ date: new Date().toISOString().split('T')[0], type: 'Procedure', notes: '' });

  if (!patient) {
    return <div className="page-container">Patient not found</div>;
  }

  const handleAddLog = (e) => {
    e.preventDefault();
    addVisit(patient.id, newLog);
    setShowAddLogModal(false);
    setNewLog({ date: new Date().toISOString().split('T')[0], type: 'Procedure', notes: '' });
  };

  return (
    <div className="page-container animate-fade-in">
      <button 
        className="btn btn-secondary flex-row gap-2" 
        style={{ marginBottom: '24px', border: 'none', background: 'transparent', padding: '0' }}
        onClick={() => navigate('/patients')}
      >
        <ArrowLeft size={16} /> Back to Patients Let
      </button>

      {/* Patient Header Card */}
      <div className="card" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '32px' }}>
        <div style={{
          width: '80px', height: '80px', borderRadius: 'var(--radius-full)', backgroundColor: 'var(--primary-light)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', color: 'var(--primary)', fontWeight: 'bold'
        }}>
          {patient.name.charAt(0)}
        </div>
        <div style={{ flex: 1 }}>
          <div className="flex-row gap-4" style={{ marginBottom: '8px' }}>
            <h1 style={{ fontSize: '24px' }}>{patient.name}</h1>
            <span className={`badge ${patient.condition === 'Healthy' ? 'badge-success' : 'badge-warning'}`}>
              {patient.condition}
            </span>
          </div>
          <div className="flex-row gap-6" style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
            <span className="flex-row gap-2"><span style={{ fontWeight: 500, color: 'var(--text-main)' }}>Age:</span> {patient.age}</span>
            <span className="flex-row gap-2"><span style={{ fontWeight: 500, color: 'var(--text-main)' }}>Phone:</span> {patient.phone}</span>
            <span className="flex-row gap-2"><span style={{ fontWeight: 500, color: 'var(--text-main)' }}>Patient ID:</span> #{patient.id.toString().padStart(4, '0')}</span>
          </div>
        </div>
        <div className="flex-col gap-2" style={{ alignItems: 'flex-end' }}>
          <button className="btn btn-primary flex-row gap-2" onClick={() => setShowAddLogModal(true)}>
            <Plus size={16} /> Log New Visit
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '32px' }}>
        {/* Sidebar Nav */}
        <div style={{ width: '220px', flexShrink: 0 }}>
          <div className="card" style={{ padding: '16px 8px' }}>
            <ul className="flex-col gap-2">
              <li>
                <button 
                  style={{ width: '100%', textAlign: 'left', padding: '10px 16px', borderRadius: 'var(--radius-sm)', 
                    backgroundColor: activeTab === 'history' ? 'var(--primary-light)' : 'transparent',
                    color: activeTab === 'history' ? 'var(--primary)' : 'var(--text-muted)'
                  }}
                  className="flex-row gap-2 font-medium"
                  onClick={() => setActiveTab('history')}
                >
                  <FileText size={18} /> Medical History
                </button>
              </li>
              <li>
                <button 
                  style={{ width: '100%', textAlign: 'left', padding: '10px 16px', borderRadius: 'var(--radius-sm)',
                    backgroundColor: activeTab === 'medications' ? 'var(--primary-light)' : 'transparent',
                    color: activeTab === 'medications' ? 'var(--primary)' : 'var(--text-muted)'
                  }}
                  className="flex-row gap-2 font-medium"
                  onClick={() => setActiveTab('medications')}
                >
                  <Pill size={18} /> Medications
                </button>
              </li>
            </ul>
          </div>
          
          <div className="card" style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '16px', color: 'var(--text-muted)' }}>ALERTS</h3>
            <div className="flex-row gap-2" style={{ color: 'var(--warning)', fontSize: '14px', fontWeight: 500, padding: '12px', backgroundColor: 'var(--warning-light)', borderRadius: 'var(--radius-sm)' }}>
              <AlertCircle size={16} />
              Allergic to Penicillin
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1 }}>
          {activeTab === 'history' && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Visit History</h2>
              {patientHistory.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No visit history found.
                </div>
              ) : (
                <div className="flex-col gap-4">
                  {patientHistory.map(entry => (
                    <div key={entry.id} className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                      <div className="flex-row justify-between" style={{ marginBottom: '12px' }}>
                        <div className="flex-row gap-4">
                          <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{entry.date}</span>
                          <span className="badge badge-primary">{entry.type}</span>
                        </div>
                      </div>
                      <p style={{ color: 'var(--text-main)', lineHeight: '1.5' }}>{entry.notes}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'medications' && (
            <div className="animate-fade-in">
              <h2 style={{ fontSize: '20px', marginBottom: '24px' }}>Active Prescriptions</h2>
              {patientMedications.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  No active prescriptions.
                </div>
              ) : (
                <div className="table-container">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Medication Name</th>
                        <th>Dosage</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {patientMedications.map(med => (
                        <tr key={med.id}>
                          <td style={{ fontWeight: 500 }}>{med.name}</td>
                          <td>{med.dosage}</td>
                          <td>
                            <span className="badge badge-success">{med.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showAddLogModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card animate-fade-in" style={{ width: '500px', backgroundColor: 'var(--surface)' }}>
            <h2 style={{ marginBottom: '20px' }}>Log New Visit</h2>
            <form onSubmit={handleAddLog} className="flex-col gap-4">
              <div className="input-group">
                <label className="input-label">Date</label>
                <input required type="date" className="input-field" value={newLog.date} onChange={e => setNewLog({...newLog, date: e.target.value})} />
              </div>
              <div className="input-group">
                <label className="input-label">Type</label>
                <select className="input-field" value={newLog.type} onChange={e => setNewLog({...newLog, type: e.target.value})}>
                  <option value="Procedure">Procedure</option>
                  <option value="Checkup">Checkup</option>
                  <option value="Consultation">Consultation</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>
              <div className="input-group">
                <label className="input-label">Notes</label>
                <textarea required className="input-field" style={{ minHeight: '100px', resize: 'vertical' }} value={newLog.notes} onChange={e => setNewLog({...newLog, notes: e.target.value})} placeholder="Describe the visit details..."></textarea>
              </div>
              <div className="flex-row gap-4" style={{ marginTop: '16px', justifySelf: 'flex-end' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddLogModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Save Log</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientDetail;
